'use client'
import React, { useState } from 'react';

const BinaryConverter: React.FC = () => {
    const [decimal, setDecimal] = useState<number | string>('');
    const [binary, setBinary] = useState<string>('');
    const [convertType, setConvertType] = useState<'decimalToBinary' | 'binaryToDecimal'>('decimalToBinary');
    const [error, setError] = useState<string>('');

    const decimalToBinary = (decimal: number): string => {
        return decimal.toString(2);
    };

    const binaryToDecimal = (binary: string): number => {
        return parseInt(binary, 2);
    };

    const isValidDecimal = (value: string): boolean => {
        const number = Number(value);
        return Number.isInteger(number) && number >= 0;
    };

    const isValidBinary = (value: string): boolean => {
        return /^[01]+$/.test(value);
    };

    const handleDecimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDecimal(e.target.value);
    };

    const handleBinaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBinary(e.target.value);
    };

    const handleConvert = () => {
        if (convertType === 'decimalToBinary') {
            if (decimal !== '' && isValidDecimal(decimal.toString())) {
                setBinary(decimalToBinary(Number(decimal)));
                setError('');
            } else {
                setError('Số thập phân không hợp lệ. Vui lòng nhập số nguyên dương hợp lệ.');
            }
        } else if (convertType === 'binaryToDecimal') {
            if (binary !== '' && isValidBinary(binary)) {
                setDecimal(binaryToDecimal(binary));
                setError('');
            } else {
                setError('Số nhị phân không hợp lệ. Vui lòng nhập chuỗi nhị phân hợp lệ (chỉ 0 và 1).');
            }
        }
    };

    const handleClear = () => {
        setDecimal('');
        setBinary('');
        setError('');
    };

    return (
        <div className="flex flex-col items-center p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Binary Converter</h2>

            <div className="w-full mb-4">
                <label className="block text-gray-600 mb-2">Decimal:</label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                    type="number"
                    value={decimal}
                    onChange={handleDecimalChange}
                    placeholder="Enter decimal"
                    disabled={convertType !== 'decimalToBinary'}
                />
            </div>

            <div className="w-full mb-4">
                <label className="block text-gray-600 mb-2">Binary:</label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                    type="text"
                    value={binary}
                    onChange={handleBinaryChange}
                    placeholder="Enter binary"
                    disabled={convertType !== 'binaryToDecimal'}
                />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="flex gap-4 mb-4">
                <button 
                    onClick={handleConvert} 
                    className="bg-blue-500 text-white px-5 py-3 rounded-md shadow hover:bg-blue-600 transition">
                    Convert
                </button>
                <button 
                    onClick={handleClear} 
                    className="bg-gray-500 text-white px-5 py-3 rounded-md shadow hover:bg-gray-600 transition">
                    Clear
                </button>
            </div>

            <div className="flex gap-4">
                <label className="flex items-center text-gray-600">
                    <input
                        type="radio"
                        name="convertType"
                        value="decimalToBinary"
                        checked={convertType === 'decimalToBinary'}
                        onChange={() => setConvertType('decimalToBinary')}
                        className="mr-2"
                    />
                    Decimal to Binary
                </label>

                <label className="flex items-center text-gray-600">
                    <input
                        type="radio"
                        name="convertType"
                        value="binaryToDecimal"
                        checked={convertType === 'binaryToDecimal'}
                        onChange={() => setConvertType('binaryToDecimal')}
                        className="mr-2"
                    />
                    Binary to Decimal
                </label>
            </div>
        </div>
    );
};

export default BinaryConverter;
