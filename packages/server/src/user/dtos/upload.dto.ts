
import { ApiProperty } from '@nestjs/swagger';


export class UploadDTO {
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    file: Express.Multer.File;
}