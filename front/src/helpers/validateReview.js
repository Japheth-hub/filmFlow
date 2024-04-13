export default function validateReview(points, comment){
    const data = {}
    const regex = /^[a-zA-Z0-9()"'!?.,;-\s]{5,}$/;
    points === 0 ? data.points = 'No puede estar vacio este campo' : data.points = true
    regex.test(comment) ? data.comment = true : data.comment = "Este campo debe tener minimo 5 caracteres ' (), ¿?, ¡!, -, \"\' '"
    return data
}