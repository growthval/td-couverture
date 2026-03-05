import type { ReactElement } from 'react';

export interface Testimonial {
  name: string;
  location: string;
  review: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Service {
    // FIX: Replaced JSX.Element with ReactElement and imported it to resolve "Cannot find namespace 'JSX'".
    icon: ReactElement;
    title: string;
    description: string;
    value: string;
}

export interface SimulationData {
    project: string | null;
    details: string | null;
    size: { value: number; unit: string; } | null;
    contact: {
        nom?: string;
        prenom?: string;
        email?: string;
        telephone?: string;
        codePostal?: string;
    };
}