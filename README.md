# Fieldnote

A single-page event-operations demo showcasing three reusable React components: a data grid, a day-grouped timeline, and an add/edit event form. It starts with **100,000 grid records** and **10,000 timeline events**, using mock data only.

## Getting Started

Use Node.js 24 LTS and npm.

```sh
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`. No API server, environment variables, or credentials are required.

| Command           | Purpose                                                        |
| ----------------- | -------------------------------------------------------------- |
| `npm run dev`     | Start the development server with hot reload                   |
| `npm run build`   | Typecheck the project and create a production build in `dist/` |
| `npm run preview` | Serve the production build locally; run the build first        |
| `npm run lint`    | Run ESLint                                                     |

## Demo Walkthrough

1. **Browse events.** The initial view shows status totals, the paginated grid, and a timeline panel. Use the sidebar or view tabs to switch to the full-width timeline. The panel toggle hides or restores the timeline beside the grid.
2. **Find records.** Search across the grid, click a column heading to sort, or enable **Filters** to enter column-specific values. Filters combine with search. Clear them to restore the full result set.
3. **Configure the grid.** Open **Columns** to show or hide fields, including Category and Assigned to, which start hidden. At least one column must stay visible. Pagination defaults to 10 rows, with 25, 50, and 100 also available.
4. **Create an event.** Select **New event**, enter a title and date/time, and select **Create event**. Optional details include location, assignee, and notes. Successful submission closes the dialog, updates both views and the totals, and announces success.
5. **Edit an event.** Select an event title in the grid or an item in the timeline. Change its details and select **Save changes**. **Cancel**, the close button, or Escape dismisses the dialog without saving.
6. **Inspect collection states.** The **Data preview** selector exposes Live data, Loading, Empty, and Error. Loading and Error affect the grid; Empty clears both displayed collections. **Try again** returns the grid to live mock data. These previews do not delete stored records or reset the totals.
7. **Export records.** **Export** downloads `fieldnote-events.csv` containing all stored grid records, not only the current page or filtered results. CSV values are quoted and formula-like prefixes are escaped.

All changes are in memory and reset on a page reload. There is no backend, authentication, or persistent storage.

## Components

The public exports and prop types are available from [src/components/index.ts](src/components/index.ts). This is an in-repository component library, not a separately published npm package.

### DataGrid

`DataGrid<T>` is independent of event-domain types and Zustand. Provide `data`, `columns`, and a stable `getRowId` accessor.

Each `GridColumn<T>` defines an `id`, `label`, and value `accessor`; optional `cell` and `hidden` properties customize rendering and initial visibility. Other props configure loading/error feedback, retry, accessible labels, search placeholder, initial page size, and page-size options.

```tsx
import { DataGrid } from "./src/components";
import type { GridColumn } from "./src/components";

type Asset = { id: string; name: string; location: string };

const columns: GridColumn<Asset>[] = [
  { id: "name", label: "Asset", accessor: (asset) => asset.name },
  { id: "location", label: "Location", accessor: (asset) => asset.location },
];

const assets: Asset[] = [
  { id: "camera-1", name: "Entrance camera", location: "HQ" },
];

export function AssetGrid() {
  return (
    <DataGrid
      data={assets}
      columns={columns}
      getRowId={(asset) => asset.id}
      label="Assets"
      itemLabel="assets"
    />
  );
}
```

### Timeline

`Timeline<T>` accepts `events` and `getId`, `getDate`, and `getTitle` accessors. IDs must be unique and dates must be valid date strings. Optional props include `renderDetail`, `onSelect`, `emptyState`, formatting functions, virtual row heights, and overscan.

Events are grouped by the viewer's **local calendar day**, newest day first, with chronological ordering inside each day. Day grouping keeps related operational activity together without rendering every item. Dates are stored as ISO timestamps; local date/time input is converted on save.

| Key                   | Timeline action                                               |
| --------------------- | ------------------------------------------------------------- |
| Tab / Shift+Tab       | Enter or leave the timeline's active event                    |
| Up / Down             | Move to the previous or next event                            |
| Left / Right          | Move to the first event of the previous or next displayed day |
| Home / End            | Move to the first or last event in the current day            |
| Ctrl/Cmd + Home / End | Move to the first or last event in the timeline               |
| Enter / Space         | Select the focused event; the demo opens its editor           |

The timeline uses a single roving tab stop, keeps the active item mounted during virtualization, and announces the focused event's day, title, time, and position through a live region. View tabs also support Left/Right and Home/End navigation.

### EventForm

`EventForm` renders inline; `EventFormDialog` wraps it in a modal. Both accept an optional existing `event`, an `onSave(input, id?)` callback, and `onCancel`. The save callback may return a promise; failures display a form-level error.

Validation requires a trimmed title of 1-120 characters and a valid local date/time between 1900 and 2100. Location and assignee are limited to 100 characters each, and notes to 1,000. Invalid submissions display field messages and focus the first invalid input. The demo announces successful saves outside the form.

Initial values are read when the form mounts. Use the event ID as the React `key` when switching edited records, as shown in [EventWorkspace.tsx](src/features/events/EventWorkspace.tsx).

## Architecture

```text
src/
  App.tsx              Provider and feature composition only
  app/                 Theme, providers, configurable workspace layout
  components/          Public grid, timeline, and form components
    data-grid/         Types, table-state hook, toolbar, table, collection states
    timeline/          Types, pure grouping/navigation, focus hook, item renderer
    event-form/        Form contract, submission hook, controlled field composition
  features/events/     Event domain types, constants, and workspace page
    components/        Event cells, column definitions, summaries, timeline panel
    data/              Mock dataset factory
    hooks/             Workspace view, editor, preview, notification/export flow
    store/             Zustand store and dataset-injection factory
    utils/             Accessors, statistics, export columns, form-value mapping
    validation/        Zod event schema
  shared/              Domain-independent UI, controlled fields, hooks, utilities
```

- **React + TypeScript** provides typed component contracts and generic record accessors.
- **MUI** provides dialog, form, menu, and feedback primitives. **Tailwind** supplies layout utilities; component-owned CSS controls the visual details.
- **TanStack Table** owns client-side sorting, filtering, and pagination. **TanStack Virtual** bounds timeline rendering.
- **React Hook Form + Zod** separates controlled field binding, validation, and submission from presentation. The event form is intentionally domain-specific; shared fields and dialogs can support other forms.
- **Zustand** stores event records and statistics. `createEventStore(initialEvents, timelineSize)` can create independent stores; transient view/editor state stays in `useEventWorkspace`.
- Shared utilities have no event-domain dependencies. Grid and timeline logic is separate from event-specific renderers, and styles are imported by their owners.

## Data Flow and Scale

The mock factory creates 100,000 deterministic records. The store initially takes the first 10,000 for the timeline. These sizes are configured in [constants.ts](src/features/events/constants.ts).

On save, the store updates an existing ID or inserts a new event, synchronizes the timeline, and recalculates statistics. Editing a grid record outside the original timeline subset also adds it to the timeline. The initial 10,000 is therefore a starting size, not a permanent cap. The workspace closes the editor, restores live-data preview, and publishes a notification.

Grid pagination bounds DOM rows; the grid itself is **not virtualized**. Search and column filters use deferred values, but filtering and sorting still process data on the main thread. The timeline virtualizes rows, computes day metadata before sorting, and uses indexed lookups for keyboard navigation. Statistics use a single pass when data changes, and date formatters are reused.

This is a client-side demo, not a performance guarantee for arbitrary dataset sizes or devices. Larger production workloads would benefit from worker-based processing or server-side queries. CSV serialization also runs on the main thread. Custom timeline content should fit the configured fixed row height.

## Verification and Limitations

Run `npm run build` and `npm run lint` before submission. No unit-test suite or `npm test` script is included. Earlier focused checks covered date/schema validation, CSV escaping, timeline grouping/navigation, initial dataset sizes, and store synchronization. Browser checks covered create/edit synchronization, invalid-field focus, bounded rendering, timeline arrow navigation, and keyboard pagination; complete cross-browser, screen-reader, and mobile visual testing is not claimed.

ESLint currently reports TanStack/React Compiler compatibility warnings; React Compiler is not enabled. Vite also warns about the initial JavaScript chunk size. The demo has no routes or network-backed loading/error simulation, and UI configuration is not persisted. Submission commit history should be included with the repository.
