import mongoose from 'mongoose';

const transitReportSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
        maxlength: 200
    },
    description: {
        type: String,
        required: true
    },
    incidentType: {
        type: String,
        enum: ['retraso', 'averia', 'accidente', 'aglomeracion', 'desvio', 'otro'],
        required: true
    },
    severity: {
        type: String,
        enum: ['bajo', 'medio', 'alto', 'critico'],
        default: 'medio'
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    vehicleId: {
        type: String
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
})

export default mongoose.model('transitReport', transitReportSchema);