const convertObj = {
    C: {
        pt: 2,
        qt: 4,
        gal: 16,
        ml: 236.588,
        L: 0.2366
    },
    pt: {
        qt: 2,
        gal: 8,
        ml: 473.176,
        L: 0.4732
    },
    qt: {
        gal: 4,
        ml: 946.353,
        L: 0.9464
    },
    gal: {
        ml: 3785.41,
        L: 3.7854
    },
    lb: {
        g: 453.592
    },
    oz: {
        C: 8,
        pt: 16,
        qt: 32,
        gal: 128,
        ml: 29.573,
        L: 0.02957
    },
    tsp: {
        C: 48,
        pt: 96,
        qt: 192,
        gal: 768,
        oz: 6,
        Tbsp: 3,
        ml: 4.929,
        L: 0.0049
    },
    Tbsp: {
        C: 16,
        pt: 32,
        qt: 64,
        gal: 256,
        oz: 2,
        ml: 14.787,
        L: 0.0147
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
    } else {
        convertQty = (qty1 * convertObj[unit2][unit1]) + qty2
        convertUnit = unit2
    }
}

export default handleConversion