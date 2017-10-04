# Movies Evan Likes!

## Setup

1. Clone this repo.
2. `npm i` or `yarn`
3. `npm run serve` or `yarn serve` to start the local API and file server
3. `npm run watch` or `yarn watch` to start the bundle watcher
4. Open [http://localhost:3000](http://localhost:3000)

## Instructions

You can find the instructions [here](https://github.com/kofile/ko-take-homes/blob/master/front-end/movies-evan-likes/docs/INSTRUCTIONS.md).


## ATP Notes

Each # is a commit!

### Requirements aka Commits
1. Request (not import) API data in a promise, simulating a fetch request
  - Sort Alphabetical

2. Link movie titles

3. Display movie year to the right of title

4. Display RT rating to left of title

5. Cache API response to localStorage. Do not make network request to API if the cached version is available

6. Search filter for the Movie Titles. 2 characters must be entered before filter
  - Case-INsensitive
  - any substring match

7. Filter by decade
  ex/ 2010 => all movies 2010 to 2019

8. Expand row when clicked. Should show review and collapse on click. Should not expand if link is clicked

9. Show movie art next to review

10. Style on em!

11. Check PropTypes

### Components
1. stringFilterHelper - can accept any string list and filter out the string

2. Movie Container (multi render components)
  a. Title Searcher - Uses stringFilterHelper to update movie state
  b. Decade Searcher - Accepts full API JSON object and returns a new list of objects
    - Takes lowest & highest #s in the list to set floor and ceiling
    - Filter by every decade within this range
  c. Fetch API data here
    - Title & Decade searcher need to be listening to movie state
    - Iterate through the list of movies and create a temp html elements to pass in <Accordion header= body= />

3. Accordion (functional / pure)
  a. Accepts a header and a content body
    - Both header and body should be passed in as html elements
    - This way the accordion can be used for different data

