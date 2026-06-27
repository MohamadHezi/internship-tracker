export function getStatusColor(
  status: string
): 'gray' | 'blue' | 'yellow' | 'green' | 'red' | 'purple' {
  switch (status) {
    case 'Interested':
      return 'gray';
    case 'Applied':
      return 'blue';
    case 'OA':
    case 'OA (Online Assessment)':
      return 'purple';
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
