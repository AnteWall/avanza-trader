import uvicorn

if __name__ == "__main__":
    # Start a uvicorn server
    uvicorn.run("app:app", host="localhost", port=8000, reload=False)
