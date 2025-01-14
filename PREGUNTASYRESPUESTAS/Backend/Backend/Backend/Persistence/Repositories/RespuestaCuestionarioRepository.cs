﻿using Backend.Domain.IRepositories;
using Backend.Domain.Models;
using Backend.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Backend.Persistence.Repositories
{
    public class RespuestaCuestionarioRepository: IRespuestaCuestionarioRepository
    {
        private readonly ApplicationDbContext _context;
        public RespuestaCuestionarioRepository(ApplicationDbContext context)
        {
            _context= context;
        }

        public async Task<RespuestaCuestionario> BuscarRespuestaCuestionario(int idRtaCuestionario, int idUsuario)
        {
            var respuestaCuestionario = await _context.RespuestaCuestionario.Where(x=> x.Id==idRtaCuestionario 
            && x.Cuestionario.UsuarioId==idUsuario &&x.Activo==1).FirstOrDefaultAsync();
            return respuestaCuestionario;
        }

        public async Task EliminarRespuestaCuestionario(RespuestaCuestionario respuestaCuestionario)
        {
            respuestaCuestionario.Activo = 0;
            _context.Entry(respuestaCuestionario).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<int> GetIdCuestionarioByIdRespuesta(int idRespuestaCuestionario)
        {
            var cuestionario = await _context.RespuestaCuestionario.Where
                (x => x.Id == idRespuestaCuestionario && x.Activo == 1).FirstOrDefaultAsync();
            return cuestionario.CuestionarioId;
        }

        public async Task<List<RespuestaCuestionarioDetalle>> GetListRespuestas(int idRespuestaCuestionario)
        {
            var listRespuestas = await _context.RespuestaCuestionarioDetalle.Where
                (x => x.RespuestaCuestionarioId == idRespuestaCuestionario).
                Select(x => new RespuestaCuestionarioDetalle
                {
                    RespuestaId = x.RespuestaId,
                }).ToListAsync();
            return listRespuestas;
        }

        public async Task<List<RespuestaCuestionario>> ListRespuestaCuestionario(int idCuestionario, int idUsuario)
        {
            var listRespuestaCuestionario = await _context.RespuestaCuestionario.
                Where(x=> x.CuestionarioId == idCuestionario && x.Activo==1 && 
                x.Cuestionario.UsuarioId == idUsuario).OrderByDescending(x => x.Fecha).ToListAsync();
            return listRespuestaCuestionario;
        }

        public async Task SaveRespuestaCuestionario(RespuestaCuestionario respuestaCuestionario)
        {
            respuestaCuestionario.Activo = 1;
            respuestaCuestionario.Fecha = DateTime.Now;
            _context.Add(respuestaCuestionario);
            await _context.SaveChangesAsync();  
        }
    }
}
