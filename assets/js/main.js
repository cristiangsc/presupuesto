$(() => {

    function Gastos(gastoName, montoGasto) {
        this.gastoName = gastoName
        this.montoGasto = montoGasto
    }

    let arrayGastos = []
    let montoPresupuesto = 0

    $('#monto-presupuesto').on('change', () => {
        if ($('#monto-presupuesto').val() > 0) {
            $('.btn-calcular').prop("disabled", false);
        } else {
            alert("Debe ingresar un monto superior a 0")
        }


    })

    $('.btn-calcular').on('click', () => {
        montoPresupuesto = parseInt($('#monto-presupuesto').val());
        $('#presupuesto').html("$ " + montoPresupuesto.toLocaleString("es-ES"))
        calcularGastos()
        $('#tipo-gasto').focus()
    })

    $('.btn-gasto').on('click', () => {
        const montoGasto = parseInt($('#monto-gasto').val());
        const tipoGasto = $('#tipo-gasto').val();
        if (montoGasto > 0 && tipoGasto != "") {
            addGastos(montoGasto, tipoGasto)
        } else {
            alert("Debe ingresar un valor en el Ìtem Gasto o descripción")
        }

    })

    const addGastos = (montoGasto, tipoGasto) => {
        const gasto = new Gastos(tipoGasto, montoGasto)
        arrayGastos.push(gasto)
        $('#monto-gasto').val('')
        $('#tipo-gasto').val('')
        calcularGastos()
        addRow(montoGasto, tipoGasto)
    }

    const calcularGastos = () => {
        let calculaGasto = 0
        for (let i = 0; i < arrayGastos.length; i++) {
            const element = arrayGastos[i];
            calculaGasto += element.montoGasto
        }
        const saldo = montoPresupuesto - calculaGasto
        $('#gastos').html("$ " + calculaGasto.toLocaleString("es-ES"))
        $('#saldo').html("$ " + saldo.toLocaleString("es-ES"))
        console.log(arrayGastos);
    }

    const addRow = (montoGasto, tipoGasto) => {
        var nuevoTr = `<tr><td>${tipoGasto}</td><td>${montoGasto.toLocaleString("es-ES")}</td><td class="trash"><i class="fa fa-trash-o" aria-hidden="true"></i></td><th>`;
        $('tbody').append(nuevoTr);
    }

    $(document).on('click', '.trash', function(event) {
        const montoGasto = $(this).parents("tr").find("td").eq(1).text();
        const tipoGasto = $(this).parents("tr").find("td").eq(0).text();

        removeGasto(montoGasto, tipoGasto)
        $(this).closest('tr').remove();
    });

    const removeGasto = (montoGasto, tipoGasto) => {
        for (let i = 0; i < arrayGastos.length; i++) {
            const element = arrayGastos[i];
            if (element.gastoName == tipoGasto && element.montoGasto.toLocaleString("es-ES") == montoGasto) {
                arrayGastos.splice(i, 1)

                calcularGastos()
            }
        }

    }


});