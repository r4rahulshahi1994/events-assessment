import { eventCategories, eventStatuses } from '../constants'
import type { EventRecord } from '../types'

const titles : string[] = [
  'North entrance access review',
  'Camera firmware update',
  'Weekly system health check',
  'Perimeter inspection',
  'Visitor access audit',
  'Emergency response drill',
  'Server room maintenance',
  'Parking access review',
  'Security team briefing',
  'Network connectivity check',
]
const locations : string[] = [
  'Montreal HQ',
  'Building A',
  'West campus',
  'Building B',
  'Operations center',
]
const owners : string[] = [
  'Rahul Shahi',
  'Jamie Chen',
  'Sam Rivera',
  'Taylor Brooks',
  'Jordan Lee',
]

export function createMockEvents(count: number): EventRecord[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `EVT-${String(index + 1).padStart(6, '0')}`,
    title: titles[index % titles.length],
    date: new Date(
      2026,
      9,
      19 - Math.floor(index / 80),
      8,
      (index % 80) * 7,
    ).toISOString(),
    category: eventCategories[index % eventCategories.length],
    status: eventStatuses[index % eventStatuses.length],
    location: locations[index % locations.length],
    owner: owners[index % owners.length],
    description:
      'Coordinate with the on-site team and record the outcome in the operations log.',
  }))
}
