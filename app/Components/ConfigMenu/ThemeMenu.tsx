"use client";

import useLocalStorage from "@/app/_lib/customHooks/useLocalStorageV2";
import { clsx } from "clsx";
import { useEffect, useState } from "react";

const themesArray = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

const ThemePod = ({
  themeName,
  actualTheme,
  changeTheme,
}: {
  themeName: string;
  actualTheme: string;
  changeTheme: (newTheme: string) => void;
}) => {
  return (
    <li className="m-2">
      <label>
        <input
          type="radio"
          name="theme-dropdown"
          className="theme-controller hidden"
          aria-label={themeName}
          value={themeName}
          checked={themeName == actualTheme}
          onChange={() => changeTheme(themeName)}
        />
        <span
          data-theme={themeName}
          className="bg-base-100 hover:bg-base-300 rounded-btn text-base-content block w-full cursor-pointer font-sans"
        >
          <span className="grid grid-cols-5 grid-rows-3">
            <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={clsx("h-3 w-3 shrink-0", {
                  invisible: themeName != actualTheme,
                })}
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{" "}
              <span className="flex-grow text-sm">{themeName}</span>{" "}
              <span className="flex h-full shrink-0 flex-wrap gap-1">
                <span className="bg-primary rounded-badge w-2"></span>{" "}
                <span className="bg-secondary rounded-badge w-2"></span>{" "}
                <span className="bg-accent rounded-badge w-2"></span>{" "}
                <span className="bg-neutral rounded-badge w-2"></span>
              </span>
            </span>
          </span>
        </span>
      </label>
    </li>
  );
};

export default function ThemeMenu() {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  // useState(
  //   () => {
  //     console.log("se ejecuta");
  //       if (typeof window !== 'undefined' && window.localStorage) {
  //         //console.log("LOCAL"+localStorage.getItem("theme"))
  //         return JSON.parse(localStorage.getItem("theme") || '"light"');
  //       } else {
  //         return "light";
  //       }
  //   }
  //   //console.log(theme);
  // );

  // useEffect(() => {
  //   localStorage.setItem("theme", JSON.stringify(theme));
  // }, [theme]);

  //const [theme, setTheme] = useLocalStorage("theme", "invalid");

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div className="dropdown mb-72">
      <div tabIndex={0} role="button" className="btn m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="h-2 w-2 fill-current opacity-60 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-60 h-96 overflow-y-scroll scroll-mr-2"
      >
        {themesArray.map((arrayThemeName) => (
          <ThemePod
            key={arrayThemeName}
            themeName={arrayThemeName}
            actualTheme={theme}
            changeTheme={changeTheme}
          />
        ))}
      </ul>
    </div>
  );
}
