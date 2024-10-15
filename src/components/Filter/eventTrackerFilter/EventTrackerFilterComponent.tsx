import './index.css'

interface EventTrackerFilterProps {
  value: any,
  method: () => void,
}

const EventTrackerFilterComponent = ({ value, method }: EventTrackerFilterProps) => {
  return (
    <>
      <p>EventTrackerFilterComponent works!</p>
    </>
  );
}

export default EventTrackerFilterComponent;

