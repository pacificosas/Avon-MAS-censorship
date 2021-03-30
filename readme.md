# Product censorship

Proyecto para eliminar productos del DOM en pagina MAS de acuerdo a parametros
de url y patrones de nombre.


# Cómo usarlo

```
productCensorship( options )
```

## Opciones

- **pathname** : `string` - expresion regular del path donde se ejecutara el
  script.
- **productPattern**: `string` - expresion regular que define el patron de
  nombre de los productos a eliminar.
- **productsNames**: `Array<string>` - lista de nombres de productos exactos a eliminar

## ejemplos

```
// eliminar todos los productos que contengan la palabra "color" en path que comienza con /search...
productCensorship({pathname:"^/search.*",productPattern:"color"})

// eliminar 2 productos puntuales en cualquier ruta
productCensorship({pathname:".*",productsNames:['labial 36fps', "labial 8 en 1"]})

// eliminar todos los productos que contengan la palabra "color" y 2 productos especificos en path que comienza con /search...
productCensorship({pathname:"^/search.*",productPattern:"color",productsNames:['labial 36fps', "labial 8 en 1"]})
```