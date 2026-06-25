export const APPLICATION_STATUSES = [
    'Interested',
    'Applied',
    'OA',
    'Interview',
    'Offer',
    'Rejected',
] as const;

export type ApplicationStatus = typeof APPLICATION_STATUSES[number];