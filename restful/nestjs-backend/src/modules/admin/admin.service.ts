import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from '../user/dto/create-user.dto';

@Injectable()
export class AdminService {

    constructor(
        private prisma: PrismaService
    ) { }

    async getStats() {
        const users = await this.prisma.user.count();
        const files = await this.prisma.file.count();

        return { users, files }
    }

    async createAdmin(dto: CreateUserDTO) {
        const admin = await this.prisma.user.create({
            data: {
                ...dto,
                role: "ADMIN"
            }
        });
        return admin;
    }

}
