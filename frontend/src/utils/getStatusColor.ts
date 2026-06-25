export function getStatusColor(
  status: string
): 'gray' | 'blue' | 'yellow' | 'green' | 'red' {
  switch (status) {
    case 'Applied':
      return 'blue';

    case 'Interview':
      return 'yellow';

    case 'Offer':
      return 'green';

    case 'Rejected':
      return 'red';

    default:
      return 'gray';
  }
}