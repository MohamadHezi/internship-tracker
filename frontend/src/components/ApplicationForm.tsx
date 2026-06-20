import { useState } from 'react';

interface ApplicationFormProps {
  onAddApplication: (company: string, position: string) => void;
}

function ApplicationForm({ onAddApplication }: ApplicationFormProps) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');

  function handleSubmit() {
    if (!company || !position) {
      return;
    }

    onAddApplication(company, position);

    setCompany('');
    setPosition('');
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
      />

      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(event) => setPosition(event.target.value)}
      />

      <button onClick={handleSubmit}>
        Add Application
      </button>
    </div>
  );
}

export default ApplicationForm;