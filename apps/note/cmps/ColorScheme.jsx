export function ColorScheme({ onColorEdit, setColorChoicesVisible }) {
  const colorScheme = [
    'Default',
    'Coral',
    'Peach',
    'Sand',
    'Mint',
    'Sage',
    'Fog',
    'Storm',
    'Dusk',
    'Blossom',
    'Clay',
    'Chalk',
  ]
  const colorCode = [
    'white',
    '#faafa8',
    '#f39f76',
    '#fff8b8',
    '#e2f6d3',
    '#b4ddd3',
    '#d4e4ed',
    '#aeccdc',
    '#d3bfdb',
    '#f6e2dd',
    '#e9e3d4',
    '#efeff1',
  ]
  return (
    <div
      className="color-scheme"
      style={{
        position: 'absolute',
        left: 0,
        bottom: -50,
        // top: `${colorChoicesPosition.top}px`,
        zIndex: 1,
      }}
    >
      {colorScheme.map((color, idx) => (
        <span
          key={idx}
          style={{ backgroundColor: colorCode[idx] }}
          title={color}
          onClick={() => {
            onColorEdit(colorCode[idx], note)
            setColorChoicesVisible(false)
          }}
          className={`fill color${idx + 1}`}
        ></span>
      ))}
    </div>
  )
}
