# Trackflix

Trackflix is a web application built with Gatsby that serves as a tool to organize and manage your video library. With features like a Video Player, Video Preview, and a stunning Background Showcase, Trackflix provides a seamless way to enjoy and organize your favorite videos.
It uses the [Trackflix CMS](https://github.com/trackit/trackflix-cms) as a backend to store and manage video content.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)

## Features

- **Video Player:** Enjoy your videos with a built-in video player.
- **Video Preview:** Quickly preview video content before watching.
- **Background Showcase:** A visually appealing background to enhance your viewing experience.

## Getting Started

These instructions will help you get a copy of Trackflix up and running on your local machine.

### Prerequisites

- [Git](https://git-scm.com/)
- Node.js: [v16.20.x recommended](https://nodejs.org/en/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/trackit/trackflix-client.git
    ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
    npm run develop
    ```

### Environment Variables

| Variable Name | Description | Default Value |
| ------------- | ----------- | ------------- |
| `REACT_APP_CMS_BASE_URL` | The URL of the Trackflix API | `https://trackflix-cms.trackit.io/` |
| `REACT_APP_CMS_TOKEN` | The API token used to authenticate with the Trackflix API | None |
