export interface DataAccessConfig {
    userId: string;
    dataUrl: string;
    dsUrl: string;
    onPrem?: boolean;
    tz?: string;
}
export interface ApiResponse<T = any> {
    data: T;
    errors?: string[];
}
export interface DeviceDetail {
    devID: string;
    devTypeID: string;
}
export interface SensorInfo {
    sensorId: string;
    sensorName: string;
}
export interface DeviceMetadata {
    _id: string;
    devID: string;
    devName: string;
    devTypeID: string;
    devTypeName: string;
    sensors: SensorInfo[];
    location?: {
        latitude: number;
        longitude: number;
    };
    tags?: string[];
    addedOn: string;
    widgets: any[];
    params: Record<string, any>;
    topic: string;
    canUserEdit: boolean;
    star: boolean;
    unit: Record<string, string[]>;
    unitSelected: Record<string, string>;
    properties: Array<{
        propertyName: string;
        propertyValue: any;
    }>;
    added_by: string;
    config: any[];
    geoFences: any[];
    custom: Record<string, any>;
    __v: number;
    isHidden: boolean;
}
export interface UserInfo {
    _id: string;
    email: string;
    organisation: {
        _id: string;
        orgID: string;
        orgName: string;
        hostname: string;
        phone: number;
    };
    timeCreated: string;
    userDetail: {
        personalDetails: {
            name: {
                first: string;
                last: string;
            };
            phone: {
                number: string;
                internationalNumber: string;
                dialCode: string;
                countryCode: string;
                e164Number: string;
                name: string;
            };
            profilePicUrl: string;
            gender: string;
        };
        _id: string;
    };
}
export interface SensorDataPoint {
    time: string | number;
    sensor: string;
    value: string | number | null;
}
export interface RawSensorData {
    time?: string | number;
    sensor?: string;
    value?: string | number | null;
}
export interface CursorInfo {
    end?: number;
    limit?: number;
}
export interface GetFirstDpOptions {
    deviceId: string;
    sensorList?: string[] | null;
    cal?: boolean;
    startTime?: string | number | Date | null;
    n?: number;
    alias?: boolean;
    unix?: boolean;
    onPrem?: boolean | null;
}
export interface GetDpOptions {
    deviceId: string;
    sensorList?: string[] | null;
    n?: number;
    cal?: boolean;
    endTime?: string | number | Date | null;
    alias?: boolean;
    unix?: boolean;
    onPrem?: boolean | null;
}
export interface CleanedTableOptions {
    data: any[];
    alias?: boolean;
    cal?: boolean;
    deviceId?: string | false;
    sensorList?: string[];
    onPrem?: boolean;
    unix?: boolean;
    metadata?: DeviceMetadata | null;
    pivotTable?: boolean;
}
export interface DataQueryOptions {
    deviceId: string;
    sensorList?: string[] | null;
    startTime?: string | number | Date | null;
    endTime?: string | number | Date | null;
    cal?: boolean;
    alias?: boolean;
    unix?: boolean;
    onPrem?: boolean | null;
}
export interface InfluxDbOptions {
    deviceId: string;
    startTime: number;
    endTime: number;
    alias?: boolean;
    cal?: boolean;
    unix?: boolean;
    sensorList?: string[];
    metadata?: DeviceMetadata | null;
    onPrem?: boolean | null;
}
export interface CursorData {
    start?: number;
    end?: number;
}
export interface GetLoadEntitiesOptions {
    onPrem?: boolean | null;
    clusters?: string[] | null;
}
export interface LoadEntity {
    id: string;
    name: string;
    type?: string;
    description?: string;
    [key: string]: any;
}
export interface LoadEntitiesResponse {
    data: LoadEntity[];
    totalCount: number;
    error?: boolean;
}
export default class DataAccess {
    private userId;
    private dataUrl;
    private dsUrl;
    private onPrem;
    private tz;
    /**
     * Class constructor for DataAccess.
     * @param options - Configuration options for DataAccess.
     * @param options.userId - The user ID to use for API requests.
     * @param options.dataUrl - The data URL for the API.
     * @param options.dsUrl - The DS URL for the API.
     * @param options.onPrem - Whether the API is on-premises or Live. Defaults to false.
     * @param options.tz - Timezone to use. Defaults to "UTC".
     */
    constructor({ userId, dataUrl, dsUrl, onPrem, tz }: DataAccessConfig);
    /**
     * Helper function to format error messages
     * @param response - The axios response object
     * @param url - The URL that was requested
     * @returns Formatted error message
     */
    private errorMessage;
    /**
     * Convert a given time to Unix timestamp in milliseconds.
     * @param time - The time to be converted. It can be a string in ISO 8601 format, a Unix timestamp in milliseconds, or a Date object. If null or undefined, the current time is used.
     * @param timezone - The timezone to use (e.g., 'America/New_York', 'UTC'). This is used when time is not provided or doesn't have timezone info.
     * @returns The Unix timestamp in milliseconds.
     * @throws Error if the provided Unix timestamp is not in milliseconds or if there are mismatched offset times.
     */
    private timeToUnix;
    /**
     * Sleep for a specified number of milliseconds
     * @param ms - Number of milliseconds to sleep
     * @returns Promise that resolves after the specified time
     */
    private _sleep;
    /**
     * Format sensor data from API response
     * @param data - Raw sensor data from API
     * @returns Formatted sensor data array
     */
    private formatSensorData;
    /**
     * Gets a cleaned table from sensor data
     * @param options - Configuration options for cleaning the data
     * @returns The cleaned data array
     */
    private getCleanedTable;
    /**
     * Fetches user info from the API using axios.
     * @param onPremOverride - Whether to override the onPrem flag.
     * @returns User info object or empty object on error.
     *
     * @throws Error if an error occurs during the HTTP request, such as a network issue or timeout.
     * @throws Error if an unexpected error occurs during metadata retrieval, such as parsing JSON data or other unexpected issues.
     * gives a JSON {{
      "_id": "645a159222722a319ca5f5ad",
      "email": "datascience@faclon.com",
      "organisation": {
          "_id": "5b0d386f82d7525268dfbe06",
          "orgID": "Faclon_Labs",
          "orgName": "Faclon Labs",
          "hostname": "iosense.io",
          "phone": 1234567890
      },
      "timeCreated": "2023-05-09T09:42:42.189Z",
      "userDetail....
      }
     */
    getUserInfo(onPremOverride?: boolean | null): Promise<UserInfo | {}>;
    /**
     * Fetches device details from the API using axios.
     * @param onPremOverride - Whether to override the onPrem flag.
     * @returns Device details array or empty array on error. [{"devID": "L3_VECTOR_21", "devTypeID": "CUSTOM_SECTIONS_01"...}]
     *
     * @throws Error if an error occurs during the HTTP request, such as a network issue or timeout.
     * @throws Error if an unexpected error occurs during metadata retrieval, such as parsing JSON data or other unexpected issues.
     */
    getDeviceDetails(onPremOverride?: boolean | null): Promise<DeviceDetail[] | {}>;
    /**
     * Fetches device metadata from the API using axios.
     * @param deviceID - The ID of the device to fetch metadata for.
     * @param onPremOverride - Whether to override the onPrem flag.
     * @returns Device metadata object or empty object on error.
     *
     * @throws Error if an error occurs during the HTTP request, such as a network issue or timeout.
     * @throws Error if an unexpected error occurs during metadata retrieval, such as parsing JSON data or other unexpected issues.
     */
    getDeviceMetaData(deviceID: string, onPremOverride?: boolean | null): Promise<DeviceMetadata | {}>;
    /**
     * Retrieves the first datapoint(s) for specified sensors on a device starting from a given time.
     * @param options - Configuration options
     * @param options.deviceId - The ID of the device to fetch data from
     * @param options.sensorList - List of sensor IDs. If null, fetches data for all sensors
     * @param options.cal - Whether to apply calibration to sensor values
     * @param options.startTime - The time from which to start fetching data
     * @param options.n - Number of datapoints to fetch (must be ≥ 1)
     * @param options.alias - Whether to use sensor aliases instead of IDs
     * @param options.unix - Whether to return timestamps in Unix format
     * @param options.onPrem - Whether to use on-premise API endpoints
     * @returns Array of datapoints with time and sensor values
     *
     * @throws Error if parameter 'n' is less than 1
     * @throws Error if the specified device is not found in the account
     * @throws Error if no sensor data is available for the device
     * @throws Error if the API request fails or returns an error response
     */
    getFirstDp(options: GetFirstDpOptions): Promise<any[]>;
    /**
     * Retrieves datapoint(s) for specified sensors on a device up until a given end time.
     * @param options - Configuration options
     * @param options.deviceId - The ID of the device to fetch data from
     * @param options.sensorList - List of sensor IDs. If null, fetches data for all sensors
     * @param options.n - Number of datapoints to fetch
     * @param options.cal - Whether to apply calibration to sensor values
     * @param options.endTime - The time up until which to fetch data
     * @param options.alias - Whether to use sensor aliases instead of IDs
     * @param options.unix - Whether to return timestamps in Unix format
     * @param options.onPrem - Whether to use on-premise API endpoints
     * @returns Array of datapoints with time and sensor values
     *
     * @throws Error if parameter 'n' is less than 1
     * @throws Error if the specified device is not found in the account
     * @throws Error if no sensor data is available for the device
     * @throws Error if the API request fails or returns an error response
     */
    getDp(options: GetDpOptions): Promise<any[]>;
    /**
     * Queries sensor data for a device within a specified time range.
     * @param options - Configuration options
     * @param options.deviceId - The ID of the device to fetch data from
     * @param options.sensorList - List of sensor IDs. If null, fetches data for all sensors
     * @param options.startTime - Start time for the query range
     * @param options.endTime - End time for the query range
     * @param options.cal - Whether to apply calibration to sensor values
     * @param options.alias - Whether to use sensor aliases instead of IDs
     * @param options.unix - Whether to return timestamps in Unix format
     * @param options.onPrem - Whether to use on-premise API endpoints
     * @returns Array of sensor data points
     *
     * @throws Error if the time range is invalid (start > end)
     * @throws Error if the specified device is not found in the account
     * @throws Error if no sensor data is available for the device
     */
    dataQuery(options: DataQueryOptions): Promise<any[]>;
    /**
     * Internal method to fetch data from InfluxDB with cursor-based pagination
     * @param options - Configuration options for InfluxDB query
     * @returns Array of sensor data points
     */
    private _influxdb;
    /**
     * Retrieves load entities (clusters) from the API with pagination support.
     * @param options - Configuration options
     * @param options.onPrem - Whether to use on-premise API endpoints
     * @param options.clusters - List of cluster names/IDs to filter by. If null, returns all clusters
     * @returns Array of load entities/clusters
     *
     * @throws Error if no clusters are provided when clusters parameter is an empty array
     * @throws Error if the API request fails after maximum retries
     * @throws Error if the API returns an error response
     */
    getLoadEntities(options?: GetLoadEntitiesOptions): Promise<LoadEntity[]>;
}
//# sourceMappingURL=DataAccess.d.ts.map