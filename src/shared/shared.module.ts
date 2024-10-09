import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from 'src/auth/services/auth.service';
import { PasswordService } from 'src/user/services/password.service';
import { CrudUserService } from 'src/user/services/crudUser.service';
import { AccessSessionsService } from 'src/auth/services/accessSessions.service';
import { UserRepository } from './repositories/user.repository';
import { AccessSessionsRepository } from './repositories/accessSessions.repository';
import { AccessSessions } from './entities/accessSessions.entity';
import { IdentificationTypes } from './entities/identificationTypes.entity';
import { Roles } from './entities/roles.entity';
import { TaskTags } from './entities/taskTags.entity';
import { Tasks } from './entities/tasks.entity';
import { Tags } from './entities/tags.entity';
import { Status } from './entities/status.entity';
import { Projects } from './entities/projects.entity';
import { ProjectRoles } from './entities/projectRoles.entity';
import { ProjectCategories } from './entities/projectCategories.entity';
import { Priorities } from './entities/priorities.entity';
import { Members } from './entities/members.entity';
import { Comments } from './entities/comments.entity';
import { Categories } from './entities/categories.entity';
import { Assignments } from './entities/assignments.entity';

@Module({})
export class SharedModule {
  static forRoot(): DynamicModule {
    return {
      module: SharedModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('db.host'),
            port: configService.get<number>('db.port'),
            username: configService.get('db.user'),
            password: configService.get('db.password'),
            database: configService.get('db.database'),
            entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
            autoLoadEntities: true,
          }),
        }),
        TypeOrmModule.forFeature([
          Users,
          AccessSessions,
          IdentificationTypes,
          Roles,
          TaskTags,
          Tasks,
          Tags,
          Status,
          Projects,
          ProjectRoles,
          ProjectCategories,
          Priorities,
          Members,
          Comments,
          Categories,
          Assignments,
        ]),
        PassportModule,
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get('jwt.secret'),
            signOptions: { expiresIn: configService.get('jwt.expiresIn') },
          }),
        }),
        PassportModule.register({
          defaultStrategy: 'jwt',
        }),
      ],
      controllers: [],
      providers: [
        JwtStrategy,
        AuthService,
        PasswordService,
        CrudUserService,
        AccessSessionsService,
        UserRepository,
        AccessSessionsRepository,
      ],
      exports: [],
    };
  }
}
