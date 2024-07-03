document.getElementById('appointment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    let isValid = true;

    // Validar fecha
    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
        document.getElementById('date-error').textContent = 'La fecha no puede ser anterior a la fecha actual.';
        isValid = false;
    } else {
        document.getElementById('date-error').textContent = '';
    }

    // Validar hora (por ejemplo, entre 09:00 y 17:00)
    const appointmentTime = new Date(`1970-01-01T${time}:00`);
    const startTime = new Date('1970-01-01T09:00:00');
    const endTime = new Date('1970-01-01T17:00:00');
    if (appointmentTime < startTime || appointmentTime > endTime) {
        document.getElementById('time-error').textContent = 'La hora debe estar entre las 09:00 y las 17:00.';
        isValid = false;
    } else {
        document.getElementById('time-error').textContent = '';
    }

    if (isValid) {
        document.getElementById('payment-container').style.display = 'block';

        const appointmentData = {
            name: name,
            email: email,
            date: date,
            time: time,
        };

        fetch('http://localhost:8080/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                alert('Cita guardada con éxito. Procede al pago.');
            } else {
                alert('Error al guardar la cita');
            }
        })
        .catch(error => console.error('Error:', error));
    }
});

document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Pago realizado con éxito. Su cita ha sido agendada.');
    // Aquí puedes agregar la lógica para procesar el pago con una API de pagos
});
