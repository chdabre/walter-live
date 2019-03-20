<template>
  <canvas ref="canvas" :id="canvasId"></canvas>
</template>

<script>
/*
* This component wraps bwip-js (https://github.com/metafloor/bwip-js) in order to render different 1d and 2d barcodes to a canvas element.
* Usage: <bwip-code bcid="qrcode" text="Hello, World!"></bwip-code>
*
* Dependencies: bwip-js. If includetext is used, copy node_modules/bwip-js/fonts to public/bwipjs-fonts. (See https://github.com/metafloor/bwip-js#browser-usage)
* Props: The props are fed directly into the bwip-js settings. Follow the official reference for details.
* Events:
* - render: Emits on successful render
* - error: Emits if there is an error while rendering the barcode
* Exports:
* - BwipCode: The Vue Component
* - barcodeTypes: Object containing barcode type identifiers and descriptions
*/

import bwipjs from 'bwip-js'

export default {
  name: 'BwipCode',
  props: {
    /* These props could be extended to include any of the options specified in
    *  https://github.com/metafloor/bwip-js#browser-usage and
    *  https://github.com/bwipp/postscriptbarcode/wiki/Options-Reference
    */

    bcid: {
      type: String,
      required: true,
      validator: value => {
        return Object.keys(barcodeTypes).includes(value)
      }
    },
    text: {
      type: String,
      required: true
    },
    scale: Number,
    height: Number,
    includetext: Boolean
  },
  computed: {
    canvasId () {
      // Enable multiple component instances by adding the uid to the canvas element
      return 'bwipCodeCanvas-' + this._uid
    }
  },
  watch: {
    // Re-initialize bwip-js if a prop changes
    '$props': {
      handler () {
        this.initBwipJs()
      },
      deep: true
    }
  },
  created () {
    this.$emit('barcode-types', barcodeTypes)
  },
  mounted () {
    // Initialize bwip-js on component mount
    this.initBwipJs()
  },
  methods: {
    initBwipJs () {
      let barcodeOptions = this.$props
      // Remove all undefined props
      Object.keys(barcodeOptions).forEach(key => barcodeOptions[key] === undefined && delete barcodeOptions[key])

      bwipjs(this.canvasId, barcodeOptions, (err, cvs) => {
        if (err) {
          // Clear the canvas
          let canvas = this.$refs.canvas
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

          // Emit an error event with the error message
          this.$emit('error', err)
        } else {
          // Emit a render event if everything goes well
          this.$emit('render')
        }
      })
    }
  }
}

const barcodeTypes = {
  'auspost': 'AusPost 4 State Customer Code',
  'azteccode': 'Aztec Code',
  'azteccodecompact': 'Compact Aztec Code',
  'aztecrune': 'Aztec Runes',
  'bc412': 'BC412',
  'channelcode': 'Channel Code',
  'codablockf': 'Codablock F',
  'code11': 'Code 11',
  'code128': 'Code 128',
  'code16k': 'Code 16K',
  'code2of5': 'Code 25',
  'code32': 'Italian Pharmacode',
  'code39': 'Code 39',
  'code39ext': 'Code 39 Extended',
  'code49': 'Code 49',
  'code93': 'Code 93',
  'code93ext': 'Code 93 Extended',
  'codeone': 'Code One',
  'coop2of5': 'COOP 2 of 5',
  'daft': 'Custom 4 state symbology',
  'databarexpanded': 'GS1 DataBar Expanded',
  'databarexpandedcomposite': 'GS1 DataBar Expanded Composite',
  'databarexpandedstacked': 'GS1 DataBar Expanded Stacked',
  'databarexpandedstackedcomposite': 'GS1 DataBar Expanded Stacked Composite',
  'databarlimited': 'GS1 DataBar Limited',
  'databarlimitedcomposite': 'GS1 DataBar Limited Composite',
  'databaromni': 'GS1 DataBar Omnidirectional',
  'databaromnicomposite': 'GS1 DataBar Omnidirectional Composite',
  'databarstacked': 'GS1 DataBar Stacked',
  'databarstackedcomposite': 'GS1 DataBar Stacked Composite',
  'databarstackedomni': 'GS1 DataBar Stacked Omnidirectional',
  'databarstackedomnicomposite': 'GS1 DataBar Stacked Omnidirectional Composite',
  'databartruncated': 'GS1 DataBar Truncated',
  'databartruncatedcomposite': 'GS1 DataBar Truncated Composite',
  'datalogic2of5': 'Datalogic 2 of 5',
  'datamatrix': 'Data Matrix',
  'datamatrixrectangular': 'Data Matrix Rectangular',
  'dotcode': 'DotCode',
  'ean13': 'EAN-13',
  'ean13composite': 'EAN-13 Composite',
  'ean14': 'GS1-14',
  'ean2': 'EAN-2 (2 digit addon)',
  'ean5': 'EAN-5 (5 digit addon)',
  'ean8': 'EAN-8',
  'ean8composite': 'EAN-8 Composite',
  'flattermarken': 'Flattermarken',
  'gs1-128': 'GS1-128',
  'gs1-128composite': 'GS1-128 Composite',
  'gs1-cc': 'GS1 Composite 2D Component',
  'gs1datamatrix': 'GS1 Data Matrix',
  'gs1datamatrixrectangular': 'GS1 Data Matrix Rectangular',
  'gs1northamericancoupon': 'GS1 North American Coupon',
  'gs1qrcode': 'GS1 QR Code',
  'hanxin': 'Han Xin Code',
  'hibcazteccode': 'HIBC Aztec Code',
  'hibccodablockf': 'HIBC Codablock F',
  'hibccode128': 'HIBC Code 128',
  'hibccode39': 'HIBC Code 39',
  'hibcdatamatrix': 'HIBC Data Matrix',
  'hibcdatamatrixrectangular': 'HIBC Data Matrix Rectangular',
  'hibcmicropdf417': 'HIBC MicroPDF417',
  'hibcpdf417': 'HIBC PDF417',
  'hibcqrcode': 'HIBC QR Code',
  'iata2of5': 'IATA 2 of 5',
  'identcode': 'Deutsche Post Identcode',
  'industrial2of5': 'Industrial 2 of 5',
  'interleaved2of5': 'Interleaved 2 of 5 (ITF)',
  'isbn': 'ISBN',
  'ismn': 'ISMN',
  'issn': 'ISSN',
  'itf14': 'ITF-14',
  'japanpost': 'Japan Post 4 State Customer Code',
  'kix': 'Royal Dutch TPG Post KIX',
  'leitcode': 'Deutsche Post Leitcode',
  'matrix2of5': 'Matrix 2 of 5',
  'maxicode': 'MaxiCode',
  'micropdf417': 'MicroPDF417',
  'microqrcode': 'Micro QR Code',
  'msi': 'MSI Modified Plessey',
  'onecode': 'USPS Intelligent Mail',
  'pdf417': 'PDF417',
  'pdf417compact': 'Compact PDF417',
  'pharmacode': 'Pharmaceutical Binary Code',
  'pharmacode2': 'Two-track Pharmacode',
  'planet': 'USPS PLANET',
  'plessey': 'Plessey UK',
  'posicode': 'PosiCode',
  'postnet': 'USPS POSTNET',
  'pzn': 'Pharmazentralnummer (PZN)',
  'qrcode': 'QR Code',
  'rationalizedCodabar': 'Codabar',
  'raw': 'Custom 1D symbology',
  'royalmail': 'Royal Mail 4 State Customer Code',
  'sscc18': 'SSCC-18',
  'symbol': 'Miscellaneous symbols',
  'telepen': 'Telepen',
  'telepennumeric': 'Telepen Numeric',
  'ultracode': 'Ultracode',
  'upca': 'UPC-A',
  'upcacomposite': 'UPC-A Composite',
  'upce': 'UPC-E',
  'upcecomposite': 'UPC-E Composite'
}
</script>
