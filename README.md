# JIB-3610-QualPat
QualPat is a web application that conducts qualitative analysis on texts including conversations (multivocal) specifically with interview style, user feedback, or other text-based inputs. This application creates analysis reports in the form of tables and graphs that show topics, sentiment and word count. The input data as well as results are also available to be downloaded on each user’s local machine.

The current project is run in development mode locally. This requires you start up the frontend and backend locally to test the application.

[Licenses under MIT License](LICENSE.txt)

# Installation Guide

This guide provides step-by-step instructions on how to install and set up QualPat. Please follow these instructions carefully.

## Prerequisites

Before installing QualPat, ensure your system meets the following requirements:

### For Frontend:
- **Node.js and npm**: Required for managing ReactJS dependencies.

### For Backend:
- **Python**: Backend is developed in Python, so Python 3.11 is required.
    - Download and install Python from : https://www.python.org/downloads/

## Installation Instructions

### Frontend Installation:
1. **Install Node.js and npm**: 
   - Download and install Node.js and npm from [Node.js official website](https://nodejs.org/).

2. **Install Project Dependencies**: 
   - Navigate to the frontend directory and run:
     ```
     npm install
     npm install papaparse react-csv
     ```

3. **Start the Frontend Server**:
   - Run the following command:
     ```
     npm start
     ```

### Backend Installation:
1. **Install Python Dependencies**: 
   - Navigate to the backend directory and install the required libraries:
     ```
     pip install flask flask_cors transformers numpy scipy datemine json
     ```

2. **Run the Backend Server**:
   - Start the server by running:
     ```
     python3 new/backend/server.py
     ```

## Post-Installation

After installing both the frontend and backend, ensure that both servers are running. The frontend should typically be accessible at `http://localhost:3000`.

# Release Notes

## Version 1.0.0:

### New Features
1. **Results Page Update**: Now displays all weights for sentiments for a more detailed sentiment analysis.
2. **Topic Weights Display**: The results page has been updated to display weights alongside topics, offering a comprehensive view.
3. **Information Visualization Improvement**: Enhanced the connection of information visualization to the data table for seamless data representation.
4. **Loading Screen Introduction**: Added a loading screen to improve user experience during data processing.
5. **Table Header Revision**: Changed the table header to differentiate between speakers more clearly.
6. **Export Data Introduction**: Added a export Data funtion to allow users to export their analysis to a csv file. 

### Bug Fixes
* **Neutral Sentiment Display Fix**: Fixed an issue where the information visualization was not displaying the neutral sentiment.

#### Known Issues
* Function for making BardAPI call is not linked the frontend right now due to cookie issue/lack of API key; function should be easily integrated with other functions in future version.
* The user is not currently able to use the Sign in or History Features.
* Currently, our application is not being hosted with a public domain, so there is no internet access to the application.



### ____________________________________________________________________________


## Version 0.4.0:

### New Features
1. Extended the functionality of the upload button to allow for parsing of .csv files. Now, you can import and work with your data.
2. Implemented dynamic tables instead of static tables on the results page. Provides a more interactive user experience by adapting to the uploaded data.
3. Minor style adjustments to enhance the overall aesthetics.
4. Restructured the code to make it easier to modify the .csv parsing part with API calls for future improvements.
5. A function for making a BardAPI call to output a summary on the given text created.
6. Implemented Roberta sentiment analysis model.
7. Implemented word count feature.
8. Used another NLP model -- "cardiffnlp/tweet-topic-21-multi" -- to process and extract the top topics of input content. Topics are indicated by scores that reflects their "strengths" in a given input. The scores do not need to add up to 1. Only topics with strength scores greater than 0.1 are output.
9. Gathered the above features (6-8) together in a single function to be called from the frontend.
10. Connected the frontend and the backend through server.py file, allowing making changes in the frontend, and passing the new contents to the backend for sentiment analysis, word count, and topic extraction.

### Bug Fixes
* Nothing was initially stored in variables nor returned in the call that gathers all features int eh backend, fixed by inspecting the return logic of all the feature files and adjusted the handling of return variables' structures.

### Known Issues
* Function for making BardAPI call is not linked the frontend right now due to cookie issue/lack of API key; function should be easily integrated with other functions in future version.
* Need to install the papaparse library via npm for .csv parsing.
* Need to make changes to the information visualization to reflect strength of specific topics in the given inputs. Circle with a specific topic in the middle, and the size of the circle is directly related to the strength of the topic indicated by the score.


### ____________________________________________________________________________


## Version 0.3.0:

### New Features
1. **Project Redesign**: We have undertaken a significant project overhaul by building a new interface while preserving the core logic from the previous version. This effort aims to improve the usability and aesthetics of QualPat.
2. **New Homepage**: The homepage has been redesigned for enhanced user navigation and accessibility.
3. **Upload Data Page**: We've added a dedicated page for data uploads, simplifying the process for users to input their data.
4. **Results Page Enhancement**: The results page now presents information in a format tailored to the client's specific needs, closely aligning with provided mock-ups.
5. **New Test Cases**: More test files have been included to test the range of emotions provided by the sentiment analysis.

### Bug Fixes
* **Dependency Conflicts**: We have addressed dependency conflicts related to NPM packages installation, ensuring smoother installation and usage.
* **Contractions**: Before contractions and words that had "'" were not properly processed by the algorithm. Contractions now are seperated into their two words in order to process emotions more accurately.
* **Directories**: Changes in our directories were causing issues with the algorithm running on the previous platform and all of these issues have been taken care of through database migrations.

### Known Issues
* **Information Visualization**: We are aware that information visualization is not being correctly displayed in the desired format. Our team is actively working on resolving this issue to improve data presentation.
* **Format Errors in Top Navigation Bar**: Some format errors persist in the top navigation bar. We're committed to fixing these errors in the next release.


### ____________________________________________________________________________


## Version 0.2.0:

### New Features
1. Run "python manage.py runserver" to start the server. Enter http://127.0.0.1:8000/main/ in the local web browser’s address bar to go to the anaklysis page.
2. Home page, which the users are able to uoload .csv files on text-based conversations to conduct sentiment analysis. The uploaded .csv files have a preferred format which follows: Timespan, Content, Date, Time, Speaker, Recipient, and Starting Timestamp.
3. About Sentiment Analysis page, which has the information on everything about the old project including: introduction, algorithm, referenced research papers, and more miscellaneous information about the project.
4. Previous Results page, which is a placeholder page that was intended to store historical reports from different inputs.
5. Interpreting the result tab
6. Sentiment scores indicies, such as compound, negative, neutral, positive, anger and etc.
7. Visualization on the line number from each speaker in the input data.
8. Selecting a specific speaker to show the visualization on all the categories of sentiment from that individual.
9. Visualization on frequencies of each used word from a selected speaker.
10. Visualization on most commonly used words throughout the entire conversation and their corresponding frequencies.
11. Comparing the current sentiment analysis to another conversation, which is a placeholder that was intended for future implementations.

### Bug Fixes
* Fixed the dependencies issues with the old project (which is used as a reference for future implementation of our version of the project) and created proper environment for the project to successfully run. This includes:
* - Adjusted python version to 3.10
* - Downloaded python NLTK
* - Downloaded the Vader Lexicon Package
* - Downloaded the Punkt Package
* - Installed and activated Django

### Known Issues
* The old project that we use as a reference is about 7 years old, and the way the previous team used to conduct sentiment analysis is relatively outdated compared to modern day NLP models which are more powerful, accurate, and capable of analyzing multiple categories of text inputs such as reviews, conversations, and news reports. We want to do more than assigning each word in the input text a score and summing them up as the output for positive, negative, and neutral indicies. Therefore, we need to improve the algorithm and models being used significantly, which the team has already started the NLP models research process, and have been documenting everything along the research.
* The team will start building our version of the project in Sprint 3.


### ____________________________________________________________________________


## Version 0.1.0:

### New Features
* Updated README.md
* Uploaded the previous team's code

### Bug Fixes
* N/A

### Known Issues
* The existing prior version of this project (which the team is using as prototype) cannot run properly. Need to create a virtual environment with older Python version to fix dependency issues 