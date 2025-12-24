package main

import (
	"log"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// GLOBAL DATABASE VARIABLE
var db *gorm.DB

// THE DATA MODEL
// gorm.Model adds ID, CreatedAt, UpdatedAt automatically
type Submission struct {
	gorm.Model  // Adds the ID field automatically
	Name        string    `json:"name"`
	GithubLink  string    `json:"github_link"`
	Description string    `json:"description"`
	SubmittedAt time.Time `json:"submitted_at"`
}

// DATABASE SETUP
func initDB() {
	var err error
	// 1. Open (or create) the SQLite file "lab.db"
	db, err = gorm.Open(sqlite.Open("lab.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database!", err)
	}

	// 2. Auto Migrate
	db.AutoMigrate(&Submission{})
	log.Println("Database initialized and migrated. 💽")
}

func main() {
	// Initialize Database BEFORE starting the server
	initDB()

	e := echo.New()

	// Middleware
	e.Use(middleware.RequestLogger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodPost},
	}))

	// Routes
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Backend with DB is Online 🟢")
	})

	e.POST("/api/submit", func(c echo.Context) error {
		submission := new(Submission)
		if err := c.Bind(submission); err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid data"})
		}

		submission.SubmittedAt = time.Now()

		// SAVE TO DATABASE (The new part!)
		result := db.Create(&submission)
		if result.Error != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save"})
		}

		e.Logger.Infof("💾 Saved Project to DB: %s", submission.Name)

		return c.JSON(http.StatusOK, map[string]string{
			"message": "Submission saved to database",
			"status":  "success",
		})
	})

	e.Logger.Fatal(e.Start(":8080"))
}