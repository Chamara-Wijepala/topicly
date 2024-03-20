import { DateTime } from 'luxon';

function isoStringToRelativeTime(isoString: string) {
	return DateTime.fromISO(isoString).toRelative();
}

export default isoStringToRelativeTime;
