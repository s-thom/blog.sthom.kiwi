import {
  Collection,
  CollectionQueryResult,
  CollectionView,
  ExtendedRecordMap
} from 'notion-types'

interface PotentiallyTheStructureAFilterUses {
  id: string
  filter: {
    property: string
    filter: {
      operator: 'enum_is'
      value: {
        type: 'exact'
        value: string
      }
    }
  }
}

export function mutateFilterCollection(
  collection: Collection,
  view: CollectionView,
  query: CollectionQueryResult,
  recordMap: ExtendedRecordMap
): string[] {
  const filteredResults: string[] = []

  if (!query.collection_group_results) {
    return []
  }

  // Apply query logic, since it doesn't appear to be correct somewhere.
  // I'm not sure whether this is a problem in the Notion API itself, or in one of the packages.
  // This implementation is hacky and not complete.
  for (const blockId of query.collection_group_results.blockIds) {
    const block = recordMap.block[blockId]?.value
    if (!block) {
      continue
    }

    let matches = true

    if (view.format.property_filters) {
      for (const filter of view.format
        .property_filters as PotentiallyTheStructureAFilterUses[]) {
        const propertyValue = block.properties[filter.filter.property]?.[0][0]

        // Query logic time
        switch (filter.filter.filter.operator) {
          case 'enum_is':
            switch (filter.filter.filter.value.type) {
              case 'exact':
                if (propertyValue !== filter.filter.filter.value.value) {
                  matches = false
                }
                break
              default:
                console.warn(
                  `Unknown filter value type: ${filter.filter.filter.value.type}`
                )
            }
            break
          default:
            console.warn(
              `Unknown filter operator: ${filter.filter.filter.operator}`
            )
        }
      }
    }

    if (matches) {
      filteredResults.push(blockId)
    }
  }

  query.collection_group_results.blockIds = filteredResults
  return filteredResults
}
