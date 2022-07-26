import { Endian } from "./Endian";

export class ByteArray
{
    private _buffer: Buffer;
    private _littleEndian: boolean = false;
    private _position: number = 0

    public get isBigEndian()
    {
        return !this._littleEndian
    }
    
    private constructor()
    {
        this._buffer = Buffer.from([])
    }

    public hasNext()
    {
        return this._position < this._buffer.byteLength
    }

    public static fromArrayBuffer(buffer: ArrayBuffer): ByteArray
    {
        let byteArray: ByteArray = new ByteArray()
        byteArray._buffer = Buffer.from(buffer)

        return byteArray
    }

    public set endian(value: Endian)
    {
        if(value == Endian.LITTLE_ENDIAN)
        {
            this._littleEndian = true
        }
        else
        {
            this._littleEndian = false
        }
    }

    public get endian(): Endian
    {
        return this._littleEndian ? Endian.LITTLE_ENDIAN : Endian.BIG_ENDIAN
    }

    public get view(): Buffer
    {
        return this._buffer
    }

    public get float32Array(): Float32Array
    {
        return new Float32Array(this._buffer)
    }

    public get position(): number
    {
        return this._position
    }

    public set position(value: number)
    {
        if(0 <= value && value < this._buffer.byteLength)
        {
            this._position = value
        }
        else
        {
            console.assert(false, "Out of bounds at ByteArray::position")
        }
    }

    public get length(): number
    {
        return this._buffer.byteLength
    }

    public readInt8(): number
    {
        let val: number = this._buffer.readInt8(this._position);
        this._position++
        return val
    }

    public writeInt8(value: number)
    {
        this._buffer.writeInt8(this._position, value)
        this._position++
    }

    public readUint8(): number
    {
        let val: number = this._buffer.readUint8(this._position)
        this._position++
        return val
    }

    public writeUint8(value: number)
    {
        this._buffer.writeUint8(this._position, value)
        this._position++
    }

    public readInt16(): number
    {
        let val
        if(this._littleEndian)
        {
            val = this._buffer.readInt16LE(this._position)
        }
        else
        {
            val = this._buffer.readInt16BE(this._position)
        }

        this._position += 2;
        return val
    }

    public writeInt16(value: number)
    {
        if(this._littleEndian)
        {
            this._buffer.writeInt16LE(value, this._position)
        }
        else
        {
            this._buffer.writeInt16BE(value, this._position)
        }

        this._position += 2
    }

    public readUint16(): number
    {
        let val: number
        if(this._littleEndian)
        {
            val = this._buffer.readUint16LE(this._position)
        }
        else
        {
            val = this._buffer.readUint16BE(this._position)
        }

        this._position += 2
        return val
    }

    public writeUint16(value: number)
    {
        if(this._littleEndian)
        {
            this._buffer.writeUint16LE(value, this._position)
        }
        else
        {
            this._buffer.writeUint16BE(value, this._position)
        }
        this._position += 2
    }

    public readInt32(): number
    {
        let val: number 
        if(this._littleEndian)
        {
            val = this._buffer.readInt32LE(this._position)
        }
        else
        {
            val = this._buffer.readInt32BE(this._position)
        }
        
        this._position += 4
        return val
    }

    public writeInt32(value: number)
    {
        if(this._littleEndian)
        {
            this._buffer.writeInt32LE(value, this._position)
        }
        else
        {
            this._buffer.writeInt32BE(value, this._position)
        }

        this._position += 4
    }

    public readUint32(): number
    {
        let val: number
        if(this._littleEndian)
        {
            val = this._buffer.readUInt32LE(this._position)
        }
        else
        {
            val = this._buffer.readUInt32BE(this._position)
        }
        
        this._position += 4
        return val
    }

    public writeUint32(value: number)
    {
        if(this._littleEndian)
        {
            this._buffer.writeUInt32LE(value, this._position)
        }
        else
        {
            this._buffer.writeUInt32BE(value, this._position)
        }
        
        this._position += 4
    }

    public readInt64(): bigint
    {
        let val: bigint
        if(this._littleEndian)
        {
            val = this._buffer.readBigInt64LE(this._position)
        }
        else
        {
            val = this._buffer.readBigInt64BE(this._position)
        }

        // let val: bigint = this._buffer.getBigInt64(this._position, this._littleEndian)
        this._position += 8
        return val
    }

    public writeInt64(value: bigint)
    {
        if(this._littleEndian)
        {
            this._buffer.writeBigInt64LE(value, this._position)
        }
        else
        {
            this._buffer.writeBigInt64BE(value, this._position)
        }
        
        this._position += 8
    }

    public readUint64(): bigint
    {
        let val: bigint
        if(this._littleEndian)
        {
            val = this._buffer.readBigUInt64LE(this._position)
        }
        else
        {
            val = this._buffer.readBigUInt64BE(this._position)
        }
        
        this._position += 8
        return val
    }

    public writeUint64(value: bigint)
    {
        if(this._littleEndian)
        {
            this._buffer.writeBigUInt64LE(value, this._position)
        }
        else
        {
            this._buffer.writeBigUInt64BE(value, this._position)
        }

        this._position += 8
    }

    public readFloat32(): number
    {
        let val: number
        if(this._littleEndian)
        {
            val = this._buffer.readFloatLE(this._position)
        }
        else
        {
            val = this._buffer.readFloatBE(this._position)
        }
        
        this._position += 4
        return val
    }

    public writeFloat32(value: number)
    {
        if(this._littleEndian)
        {
            this._buffer.writeFloatLE(value, this._position)
        }
        else
        {
            this._buffer.writeFloatBE(value, this._position)
        }
        
        this._position += 4
    }

    public readFloat64(): number
    {
        let val
        if(this._littleEndian)
        {
            val = this._buffer.readDoubleLE(this._position)
        }
        else
        {
            val = this._buffer.readDoubleBE(this._position)
        }
        
        this._position += 8
        return val
    }

    public writeFloat64(value: number)
    {
        if(this._littleEndian)
        {
            this._buffer.writeDoubleLE(value, this._position)
        }
        else
        {
            this._buffer.writeDoubleBE(value, this._position)
        }
        
        this._position += 8
    }

    public readAscii(numBytes: number)
    {
        let str = this._buffer.toString('ascii', this._position, this._position + numBytes)
        this._position += numBytes
        return str
    }

    public readAsciiDelimiter(delimeter: string)
    {
        let str = ""
        while(this.hasNext() && this._buffer.toString('ascii', this._position, this._position + 1) != delimeter)
        {
            let char = this._buffer.toString('ascii', this._position, this._position + 1)
            str = str.concat(char)
            this._position++
        }

        return str
    }

    public readString(encoding?: BufferEncoding, start?: number, end?: number)
    {
       return this._buffer.toString(encoding, start, end)
    }
}
