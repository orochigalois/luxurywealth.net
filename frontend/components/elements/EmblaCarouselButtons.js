import React from "react";

export const DotButton = ({ selected, onClick }) => (
    <button
        className={`embla__dot ${selected ? "is-selected" : ""}`}
        type="button"
        onClick={onClick}
    />
);

export const PrevButton = ({ enabled, onClick }) => (
    <button
        className="embla__button embla__button--prev"
        onClick={onClick}
        disabled={!enabled}
    >
        <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
            <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
        </svg>
    </button>
);

export const NextButton = ({ enabled, onClick }) => (
    
    <button
        className="embla__button embla__button--next"
        onClick={onClick}
        disabled={!enabled}
    >
        <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
            <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
        </svg>
    </button>
);
export const PrevButtonAlt = ({ enabled, onClick,fill }) => (
    enabled&&
    <button
        className="embla__button embla__button--prev"
        onClick={onClick}
        disabled={!enabled}
    >
        <svg className="embla__button__svg" width="36" height="6" viewBox="0 0 36 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.86907 0L0 2.75047L5.80444 6L5.86917 3.33363H36V2.4168H5.86917L5.86907 0Z" fill={fill} />
        </svg>
    </button>
);

export const NextButtonAlt = ({ enabled, onClick,fill }) => (
    enabled&&
    <button
        className="embla__button embla__button--next"
        onClick={onClick}
        disabled={!enabled}
    >
        <svg className="embla__button__svg" width="36" height="6" viewBox="0 0 36 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M30.1309 0L36 2.75047L30.1956 6L30.1308 3.33363H0V2.4168H30.1308L30.1309 0Z" fill={fill} />
        </svg>

    </button>
);
