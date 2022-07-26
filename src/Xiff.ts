import { ByteArray } from "./ByteArray"
import { Endian } from "./Endian"

export class Xiff
{
    public static EXIF_MARKER = 0xE1
    public static IDF_MARKER =  0x8769

    private static buffer: ByteArray

    public static async load(path: string)
    {
        try
        {
            let j = await fetch(path)
            let arrayBuffer = await j.arrayBuffer()

            this.buffer = ByteArray.fromArrayBuffer(arrayBuffer)
            this.buffer.endian = Endian.BIG_ENDIAN

            console.log(">>> ", arrayBuffer.byteLength)
        }
        catch(err)
        {
            console.log("Error: ", err)
        }
    }

    public static async process()
    {
        let magicBytes = this.buffer.readUint16()
        console.log(magicBytes.toString(16))

        if(magicBytes.toString(16) == "ffd8")
        {
            console.log("Found Jpeg")
        }

        while(this.buffer.readUint8() != this.EXIF_MARKER) {}

        this.buffer.readUint16() // empty 2 bytes

        if(this.buffer.readAscii(6) == "Exif")
        {
            console.log("Found Exif string tag")
        }

        let endianStr = this.buffer.readAscii(2)
        if(endianStr == "MM")
        {
            this.buffer.endian = Endian.BIG_ENDIAN
        }
        else if(endianStr == "II")
        {
            this.buffer.endian = Endian.LITTLE_ENDIAN
        }
        else
        {
            console.warn("Missing Endianness string")
        }

        console.log(">>>> ", endianStr)

        while(this.buffer.hasNext())
        {
            let byte1 = this.buffer.readUint8()
            let byte2 = this.buffer.readUint8()
            let data = (byte1 << 8) | byte2

            if(data == this.IDF_MARKER)
            {
                console.log("I found an IDF marker at: ", this.buffer.position-2)
                break
            }
            this.buffer.position--
        }

        let length = this.buffer.readUint32()

        console.log("Length: ", length)

        let entryLength = this.buffer.readUint16()

        console.log("Entry length: ", entryLength)
    }

    private static readTags()
    {
        let isBigEndian = this.buffer.isBigEndian
    }
}

export enum XiffTagId
{
    XIFF_VERSION = 0x9000,
    FLASHPIX_VERSION = 0xA000,
    COLORSPACE = 0xA001
}
