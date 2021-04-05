# Rain

A background application for rain noise generation.

## Installation

1. Clone the repo.
2. Install the depenencies (`yarn`).
3. Build a distributable (`yarn build`).
4. Install the distributable in (`out/make/`).

> This app was supposed to be a quick and tiny little side project to use Electron, TypeScript,
> and React together to play some soothing sounds. Instead, I found it to be an excercise in
> frustration. The app is over 400 MB in side because `node_modules` could not be bundled
> correctly (System.IO.PathTooLongException), and not for the lack of trying.
>
> PRs to fix problems with the app are greatly appreciated, but PRs in upstream dependencies may
> be a better investment of time.

## Development

### Running Locally

    yarn start

Runs the app in the development mode with the debugger in a separate window.

> Hot reloading is enabled for the React application.

### Running Unit Tests

    yarn test

Launches the test runner in the interactive watch mode.

> See the section about [running tests][] for more information.

[running tests]: https://facebook.github.io/create-react-app/docs/running-tests

### Packaging

    yarn build:electron

Creates a platform specific package in the `out/` folder that is not in a distributable format.

> See the section about [package][] for more information.

[package]: https://www.electronforge.io/cli#package

### Distributing

    yarn build

Creates platform specific distributables in the `out/` folder.

> See the section about [make][] for more information.

[make]: https://www.electronforge.io/cli#make

## License

The application and its source code is available under the ISC license.

### Icon Files

"[Rain Icon](https://iconarchive.com/show/weather-icons-by-jaan-jaak/rain-icon.html)" by Jaan-Jaak is licensed under CC Attribution-Share Alike 4.0.

### Sound Files

- Gathered from [Rainbowhunt](https://rainbowhunt.com/).
  - "[Rain.wav](https://freesound.org/people/inchadney/sounds/88225/)" by inchadney is licensed under CC BY 3.0.
  - "[rain_constant_thunderinmiddle01.ogg](https://freesound.org/people/aesqe/sounds/37614/)" by aesqe is licensed under CC BY 3.0.
  - "[rbh thunder storm.wav](https://freesound.org/people/RHumphries/sounds/2523/)" by RHumphries is licensed under CC BY 3.0.
  - "[rbh thunder_10.wav](https://freesound.org/people/RHumphries/sounds/2532/)" by RHumphries is licensed under CC BY 3.0.
  - "[rbh thunder_13.wav](https://freesound.org/people/RHumphries/sounds/2535/)" by RHumphries is licensed under CC BY 3.0.
  - "[rbh thunder_07.wav](https://freesound.org/people/RHumphries/sounds/2529/)" by RHumphries is licensed under CC BY 3.0.
  - "[rbh thunder_05.wav](https://freesound.org/people/RHumphries/sounds/2527/)" by RHumphries is licensed under CC BY 3.0.
