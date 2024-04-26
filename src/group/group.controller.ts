import { Controller, Get } from '@nestjs/common';

@Controller('group')
export class GroupController {
	@Get('group')
	getGroup(){
		return 200
	}
}
