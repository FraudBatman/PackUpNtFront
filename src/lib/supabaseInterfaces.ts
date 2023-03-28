export interface backend_response {
    created_at: string,
    id: number,
    repo_id: string,
    repo_type: string
}

export interface package_info {
    created_at: string,
    id: number,
    response_id: number,
    package_name: string,
    current_version: string,
    repo_version: string,
    source_url?: string
}

export interface repo_settings {
    created_at: string,
    id: number,
    repo_id: string,
    excluded_packages: string,
    notification_frequency: string,
    notification_day: string,
    email: string
}