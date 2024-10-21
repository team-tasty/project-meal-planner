const convertObj = {
    C: {
        pt: 2,
        qt: 4,
        gal: 16,
        ml: 0.0042,
        L: 4.2268
    },
    pt: {
        qt: 2,
        gal: 8,
        ml: 0.00175,
        L: 1.7598
    },
    qt: {
        gal: 4,
        ml: 0.00106,
        L: 1.0567
    },
    gal: {
        ml: 0.000264,
        L: 0.2642
    },
    lb: {
        g: 0.0022,
        kg: 2.2046
    },
    g: {
        kg: 1000
    },
    oz: {
        C: 8,
        pt: 16,
        qt: 32,
        gal: 128,
        ml: 0.0338,
        L: 33.814
    },
    tsp: {
        C: 48,
        pt: 96,
        qt: 192,
        gal: 768,
        oz: 6,
        Tbsp: 3,
        ml: 0.2029,
        L: 202.884
    },
    Tbsp: {
        C: 16,
        pt: 32,
        qt: 64,
        gal: 256,
        oz: 2,
        ml: 0.0676,
        L: 67.628
    },
    ml: {
        L: 1000
    }
    
}


const handleConversion = (qty1, unit1, qty2, unit2) => {
    let convertQty = 0
    let convertUnit = ""
    if (convertObj[unit1][unit2]) {
        convertQty = (qty2 * convertObj[unit1][unit2]) + qty1
        convertUnit = unit1
    } else if (convertObj[unit2][unit1]) {
        convertQty = (qty1 * convertObj[unit2][unit1]) + qty2
        convertUnit = unit2
    } else {
        console.error("Invalid units received in handleConversion")
        console.error(qty1, unit1, qty2, unit2)
        return
    }
    return [+convertQty.toFixed(2), convertUnit]
}

export default handleConversion