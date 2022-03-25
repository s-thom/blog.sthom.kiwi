import {
  Block,
  CollectionPropertySchema,
  Decoration,
  ExtendedRecordMap
} from 'notion-types'

export function getPagePropertyRaw(
  propertyName: string,
  block: Block,
  recordMap: ExtendedRecordMap
): Decoration[] | null {
  if (!block.properties) {
    // TODO: check parent page?
    return null
  }

  const collection = recordMap.collection[block.parent_id]?.value

  if (!collection) {
    return null
  }

  const propertyId = Object.keys(collection.schema).find(
    (key) => collection.schema[key]?.name === propertyName
  )
  if (!propertyId) {
    return null
  }

  const property = (block.properties as any)?.[propertyId]
  if (!property) {
    return null
  }

  return property
}

export function getPropertySchema(
  propertyName: string,
  block: Block,
  recordMap: ExtendedRecordMap
): CollectionPropertySchema | null {
  if (!block.properties) {
    // TODO: check parent page?
    return null
  }

  const collection = recordMap.collection[block.parent_id]?.value

  if (collection) {
    const propertyId = Object.keys(collection.schema).find(
      (key) => collection.schema[key]?.name === propertyName
    )

    if (propertyId) {
      return collection.schema[propertyId]
    }
  }

  return null
}
