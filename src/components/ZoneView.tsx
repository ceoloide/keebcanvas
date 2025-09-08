import { useStore } from '../store/store';
import { KeyView } from './KeyView';
import { Zone } from '../lib/types';

export const ZoneView = ({ zoneName, zone }: { zoneName: string; zone: Zone }) => {
  const { setSelectedZone } = useStore();

  const handleClick = () => {
    setSelectedZone(zoneName);
  };

  return (
    <div data-testid={`zone-${zoneName}`} onClick={handleClick}>
      <h2>{zoneName}</h2>
      {Object.entries(zone.keys).map(([keyName, key]) => (
        <KeyView key={keyName} zoneName={zoneName} keyName={keyName} keyData={key} />
      ))}
    </div>
  );
};
