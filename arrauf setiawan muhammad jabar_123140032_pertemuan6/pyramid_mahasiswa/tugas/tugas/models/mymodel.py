from sqlalchemy import (
    Column,
    Index,
    Integer,
    Text,
)
# Pastikan Anda mengimpor Base dari meta.py di direktori yang sama
from .meta import Base


class Matakuliah(Base):
    __tablename__ = 'matakuliah'

    # Atribut Model Matakuliah
    id = Column(Integer, primary_key=True)
    # kode_mk: Text, Unique, Not null
    kode_mk = Column(Text, unique=True, nullable=False)
    # nama_mk: Text, Not null
    nama_mk = Column(Text, nullable=False)
    # sks: Integer, Not null
    sks = Column(Integer, nullable=False)
    # semester: Integer, Not null
    semester = Column(Integer, nullable=False)

    def to_dict(self):
        """Mengkonversi objek Matakuliah menjadi dictionary untuk JSON Response"""
        return {
            'id': self.id,
            'kode_mk': self.kode_mk,
            'nama_mk': self.nama_mk,
            'sks': self.sks,
            'semester': self.semester,
        }

# Index tidak lagi diperlukan untuk MyModel, tapi penting untuk kode_mk
Index('kode_mk_index', Matakuliah.kode_mk, unique=True)