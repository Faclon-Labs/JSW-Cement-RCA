export interface EventsHandlerConfig {
    userId: string;
    dataUrl: string;
    onPrem?: boolean;
    tz?: string;
    logTime?: boolean;
}
export interface PublishEventOptions {
    message: string;
    metaData: string;
    hoverData: string;
    createdOn?: string;
    eventTagsList?: string[];
    eventNamesList?: string[];
    title?: string;
    onPrem?: boolean;
}
export interface EventsInTimeslotOptions {
    startTime: string | Date;
    endTime?: string | Date;
    onPrem?: boolean;
}
export interface EventDataCountOptions {
    endTime?: string | Date;
    count?: number;
    onPrem?: boolean;
}
export interface DetailedEventOptions {
    eventTagsList?: string[];
    startTime?: string | Date;
    endTime?: string | Date;
    onPrem?: boolean;
}
export interface MaintenanceModuleDataOptions {
    startTime: number | string | Date;
    endTime?: number | string | Date;
    remarkGroup?: string[];
    eventId?: string[];
    maintenanceModuleId?: string;
    operator?: 'count' | 'activeDuration' | 'inactiveDuration';
    dataPrecision?: number;
    periodicity?: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
    cycleTime?: string;
    weekStart?: number;
    monthStart?: number;
    yearStart?: number;
    shifts?: any[];
    shiftOperator?: 'sum' | 'mean' | 'median' | 'mode' | 'min' | 'max';
    filter?: Record<string, any>;
    onPrem?: boolean;
}
export interface DeviceDataOptions {
    devices?: string[];
    n?: number;
    endTime?: string;
    startTime?: string;
    onPrem?: boolean;
}
export interface SensorRowsOptions {
    deviceId?: string;
    sensor?: string;
    value?: string;
    endTime?: string;
    startTime?: string;
    alias?: boolean;
    onPrem?: boolean;
}
export interface EventCategory {
    _id: string;
    name: string;
}
export interface ApiResponse<T = any> {
    data: T;
    errors?: string[];
    success?: boolean;
}
export default class EventsHandler {
    private userId;
    private dataUrl;
    private onPrem;
    private tz;
    private logTime;
    readonly version: string;
    constructor({ userId, dataUrl, onPrem, tz, logTime }: EventsHandlerConfig);
    private errorMessage;
    private isoUtcTime;
    private formatUrl;
    publishEvent(options: PublishEventOptions): Promise<any>;
    getEventsInTimeslot(options: EventsInTimeslotOptions): Promise<any[]>;
    getEventDataCount(options?: EventDataCountOptions): Promise<any[]>;
    getEventCategories(options?: {
        onPrem?: boolean;
    }): Promise<EventCategory[]>;
    getDetailedEvent(options?: DetailedEventOptions): Promise<any[]>;
    private getPaginatedData;
    getMaintenanceModuleData(options: MaintenanceModuleDataOptions): Promise<Record<string, any>>;
    private timeToUnix;
    getDeviceData(options?: DeviceDataOptions): Promise<any[]>;
    getSensorRows(options: SensorRowsOptions): Promise<any[]>;
    getDeviceMetadata(deviceId: string, onPrem?: boolean): Promise<Record<string, any>>;
}
//# sourceMappingURL=EventsHandler.d.ts.map