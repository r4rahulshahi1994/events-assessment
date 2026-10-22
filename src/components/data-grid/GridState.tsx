import { Button } from '@mui/material'
import { SearchX, TriangleAlert } from 'lucide-react'
import { CollectionState } from '../../shared/components/CollectionState'

interface GridStateProps {
  loading?: boolean
  error?: string
  onRetry?: () => void
  onClearFilters?: () => void
  itemLabel: string
}

export function GridState({
  loading,
  error,
  onRetry,
  onClearFilters,
  itemLabel,
}: Readonly<GridStateProps>) {
  if (loading) {
    return (
      <CollectionState
        className="grid-state"
        loading
        title={`Loading ${itemLabel}`}
        description="Getting your workspace ready."
      />
    )
  }

  if (error) {
    return (
      <CollectionState
        className="grid-state"
        error
        title={`Unable to load ${itemLabel}`}
        description={error}
        icon={<TriangleAlert size={28} />}
        action={
          onRetry && (
            <Button variant="outlined" onClick={onRetry}>
              Try again
            </Button>
          )
        }
      />
    )
  }

  return (
    <CollectionState
      className="grid-state"
      title={`No ${itemLabel} found`}
      description="Try a different search or clear your filters."
      icon={<SearchX size={30} />}
      action={
        onClearFilters && (
          <Button onClick={onClearFilters}>Clear all filters</Button>
        )
      }
    />
  )
}
