![University of Nantes logo](/docs/assets/logo.png)

# Ranking students

Ranking students is a project of the IUT of Nantes asked and tutored by G. Nachouki. Here to automate the task of generating rankings students.

This project was carried out and is maintained by second year students.

![Demo](/docs/assets/demo.gif)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* npm (NodeJS's official package manager)
* WebBrowser

### Installing

First of all, clone the repository
```
git clone https://gitlab.com/iut-nantes-projet-classement-etudiants/student-ranking-web-app
```

Then install all necessary modules, this can take few minutes
```
npm install
```

Finally compiles and hot-reloads for development
```
npm run serve
```

After few secondes, the console's output should be like this, now go to [localhost](localhost:8080) to check the output.

![npm run serve output](/docs/assets/npm-run-serve-output.png)

## Usage

After adapting the configuration to the format of the input files, follow theses few steps. 

### Import files

Import semester ranking files as .csv, wait until files to finish to be verified. 

For each file the result can be:
- Success: number of student found displayed
- Error: the file doesn't have all semester headers, and other headers required (see #Config) change the config or file header to make them match.

### Solve conflicts (optional)

In the case of a student who has grades for the last semester but he doesn't have for others, he will be listed in conflicts in order to complete missing ue grades.

Enter a grade between 0 and 20 included foreach ue of the conflict student which will be applied to each lesson of the ue.

### Output options

Choose output and ranking options, severals options are offered:

- Rank students by their temporary or final average
- Group or separate apprentice and general students
- Choose the output file extension (csv, ods, xls)

### Download ranking files

Download the one or two generated files, depend on if separate option has been activate

## Configuration

To change the default configuration of expected input modify the ```"src/assets/config.json"``` file by following this model:


Semester:
- **id** _(String)_ Semester id, **must be different** foreach _(ex: s1, s2...)_
- **name** _(String)_ Semester name, text displayed in the file input section _(ex: Semestre 1, Semestre 2...)_
- **finalSemester** _(Boolean)_ Is final semester of the year ? **only one can be final**
- **inputs** _(Array)_ Semester inputs displayed in the file input section (See Input)
- **ues** _(Array)_ Semester ues (See UE)
- **extras** _(Array)_ Semester extras (See Extra)

Input:

An input is own by a semester, each input of a semester will represented by a row under the semester in the file input section.

- **id** _(String)_ Input id, **must be different** foreach _(ex: s1g, s1a...)_
- **name** _(String)_ Input name, text displayed to describe the input _(ex: Formation générale, Formation en apprentissage...)_
- **apprentice** _(Boolean)_ Is an input for apprentice students ?

UE:

An UE is a group of lesson the average of them are displayed in the output file.

- **id** _(String)_ UE id, displayed at header in the output file, must be different foreach _(ex: UE 11, UE 12...)_
- **header** _(String)_ UE header in the input file, must be unique, respect the case _(ex: UE 11, UE 12...)_
- **lessons** _(Array)_ UE lessons (See Lesson)

Extra:
- **id** _(String)_ Extra id, **must be different** foreach _(ex: sport, chess...)_
- **header** _(String)_ Extra header in the input file, must be unique, respect the case _(ex: SPORT, CHESS...)_
- **amount** _(Number)_ Amount of point add the the semester grade at the end of the grade calculation _(ex: 0.2, 1...)_


Lesson:
- **id** _(String)_ Lesson id, **must be different** foreach _(ex: M3101, M3102...)_
- **header** _(String)_ Lesson header in the input file, must be unique, respect the case _(ex: M3101, M3102...)_
- **coefficient** _(Number)_ Coeficient of the lesson in for the semester _(ex: 2, 1.5...)_
- **forTemporaryAverage** _(Boolean)_ Is a lesson to count for the temporary average ?

## Deployment

Compiles and minifies for production
```
npm run build
```

## Built With

* [VueJS](https://vuejs.org/) - Javascript Framework
* [Vuetify](https://vuetifyjs.com) - Material Design Framework

## Roadmap
- [X] Generate doc of the project
- [X] Add option to separate ranking of apprentice from general students
- [ ] Implement the .ods format output
- [ ] Add a section to customise / upload / download a configuration directly in the web application
- [ ] Generate graphs based on students grades and average

## Authors

- [Emilien Bidet](https://emilienbidet.fr) - main developer

## Special thanks

- JF. Berdjugin - IUT teacher
- G. Nachouki - IUT teacher / Projet tutor