export enum SizeName {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl'
}

export enum ImageSize {
  'xs' = '320px',
  'sm' = '640px',
  'md' = '768px',
  'lg' = '1024px',
  'xl' = '1280px',
  'xxl' = '1536px'
}

export default function getSizeNameFromSize(size: number): SizeName {
  for (const [key, value] of Object.entries(ImageSize)) {
    if (Number(value.replace('px', '')) >= size) {
      return SizeName[key.toUpperCase() as keyof typeof SizeName]
    }
  }

  return SizeName.XXL
}
