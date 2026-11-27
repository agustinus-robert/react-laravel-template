import type { ChangeEvent as ReactChangeEvent, SyntheticEvent } from 'react';

export type ChangeEvent = ReactChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type FormElement = SyntheticEvent<HTMLFormElement>;
