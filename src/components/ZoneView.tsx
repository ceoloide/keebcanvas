import { useStore } from '../store/store';
import { KeyView } from './KeyView';
import { Zone } from '../lib/types';

export const ZoneView = ({ zoneName, zone }: { zoneName: string; zone: Zone }) => {
  return (
    <div>
      <h2>{zoneName}</h2>
      {Object.entries(zone.keys).map(([keyName, key]) => (
        <KeyView key={keyName} zoneName={zoneName} keyName={keyName} keyData={key} />
      ))}
    </div>
  );
};
