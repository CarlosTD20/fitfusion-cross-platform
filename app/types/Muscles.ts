// MuscleInterfaces.ts

import { Exercise } from "./Exercises";

interface MuscleList {
    data: Muscle[];
}

interface Muscle {
    id: number;
    name: string;
}

interface MuscleDetail {
    id: number;
    name: string;
    exercise: Exercise[];
}

export type { MuscleList, Muscle, MuscleDetail };