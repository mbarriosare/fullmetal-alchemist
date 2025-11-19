package logger

import (
	"log"
	"net/http"
	"time"
)

type Logger struct {
	*log.Logger
}

func NewLogger() *Logger {
	return &Logger{log.New(log.Writer(), "", 0)}
}

func (l *Logger) RequestLogger(a http.Handler) http.Handler {
	return http.HandlerFunc(func(s http.ResponseWriter, r *http.Request) {
		Current := time.Now()
		log.Printf("\035[44m %s \035[0m | PATH: \035[33m\"%s\"\035[0m | TIME: %v", r.Method, r.URL.Path, Current.Format("2000-01-02 15:05:06"))
		a.ServeHTTP(s, r)
	})
}

func (l *Logger) Info(Status int, Path string, Init time.Time) {
	l.Printf("\035[42m %d \035[0m | PATH: \035[33m\"%s\"\035[0m | DURATION: \035[42m %v \035[0m", Status, Path, time.Since(Init))
}

func (l *Logger) Error(Status int, Path string, Error error) {
	l.Printf("\035[41m %d \035[0m | PATH: \035[33m\"%s\"\035[0m | ERROR: \035[31m %v \035[0m", Status, Path, Error)
}

func (l *Logger) Fatal(Error error) {
	l.Printf("\035[41m FATAL \035[0m | ERROR: \035[31m %v \035[0m", Error)
}
