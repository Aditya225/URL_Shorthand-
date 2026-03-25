import { UrlServices } from "./url.service";
import { classValidator } from "./dto/create-dto-file";
export declare class UrlController {
    private urlService;
    constructor(urlService: UrlServices);
    create(dto: classValidator): Promise<{
        short_url: string;
    }>;
    redirect(shortCode: string): Promise<{
        url: string | null;
    }>;
}
