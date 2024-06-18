"use client";
import './globals.css'
import {AppBar, Toolbar, Typography} from "@mui/material";

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body style={{backgroundColor: "#fff3e0"}}>
        <header style={{marginBottom: 50}}>
          <AppBar position="fixed">
            <div className="container">
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                  Викторина
                </Typography>
              </Toolbar>
            </div>
          </AppBar>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
