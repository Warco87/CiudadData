import mongoose from 'mongoose';

const geoReportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 200
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ['bajo', 'medio', 'alto', 'critico'],
        default: 'medio'
    },
    reporterName: {
        type: String,
        default: 'Anónimo'
    },
    reporterEmail: {
        type: String
    },
    status: {
        type: String,
        enum: ['pendiente', 'en proceso', 'resuelto', 'falsa alarma'],
        default: 'pendiente'
    }
}, {
    timestamps: true
});

export default mongoose.model('Report', geoReportSchema);