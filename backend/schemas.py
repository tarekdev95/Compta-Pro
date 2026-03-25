from sqlalchemy import Column, Integer, String, DateTime, Date, TIMESTAMP, ForeignKey, DECIMAL, YEAR
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# ==================== USER SCHEMA ====================

class User(Base):
    __tablename__ = "User"

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    nom = Column(String(25), nullable=False)
    email = Column(String(100), nullable=False)
    mot_de_passe = Column(String(20), nullable=False)
    telephone = Column(Integer, nullable=False)

    # Relationships
    pmes = relationship("PME", back_populates="user")
    entrees = relationship("Entree", back_populates="user")
    depenses = relationship("Depense", back_populates="user")
    bilans = relationship("Bilan", back_populates="user")

# ==================== PME SCHEMA ====================

class PME(Base):
    __tablename__ = "PME"

    pme_id = Column(Integer, primary_key=True, autoincrement=True)
    nom = Column(String(30), nullable=False)
    ville = Column(String(30), nullable=False)
    user_id = Column(Integer, ForeignKey("User.user_id"), nullable=False)
    num_registre = Column(Integer, nullable=False)
    email = Column(String(30), nullable=False)
    tel = Column(Integer, nullable=False)
    type_dabonnement = Column(String(30), nullable=False)

    # Relationships
    user = relationship("User", back_populates="pmes")
    entrees = relationship("Entree", back_populates="pme")
    depenses = relationship("Depense", back_populates="pme")
    bilans = relationship("Bilan", back_populates="pme")

# ==================== ENTREE SCHEMA ====================

class Entree(Base):
    __tablename__ = "ENTREE"

    entree_id = Column(Integer, primary_key=True, autoincrement=True)
    montant_entree = Column(String(250), nullable=False)
    date = Column(DateTime, nullable=False)
    User_id = Column(Integer, ForeignKey("User.user_id"), nullable=False)
    categorie_entree = Column(String(250), nullable=False)
    update_date = Column(TIMESTAMP, nullable=False, server_default="CURRENT_TIMESTAMP")
    statut_entree = Column(String(20), nullable=False)
    description_entree = Column(String(250), nullable=False)
    pme_id_entree = Column(Integer, ForeignKey("PME.pme_id"), nullable=False)

    # Relationships
    user = relationship("User", back_populates="entrees")
    pme = relationship("PME", back_populates="entrees")

# ==================== DEPENSE SCHEMA ====================

class Depense(Base):
    __tablename__ = "Depense_ID"

    depense_id_depense = Column(Integer, primary_key=True, autoincrement=True)
    montant_depense = Column(Integer, nullable=False)
    create_date = Column(TIMESTAMP, nullable=False, server_default="CURRENT_TIMESTAMP")
    user_id_depense = Column(Integer, ForeignKey("User.user_id"), nullable=False)
    update_date = Column(TIMESTAMP, nullable=False, server_default="CURRENT_TIMESTAMP")
    categorie_depense = Column(String(250), nullable=False)
    statut_depense = Column(String(20), nullable=False)
    description_depense = Column(String(250), nullable=False)
    pme_id_depense = Column(Integer, ForeignKey("PME.pme_id"), nullable=False)

    # Relationships
    user = relationship("User", back_populates="depenses")
    pme = relationship("PME", back_populates="depenses")

# ==================== BILAN SCHEMA ====================

class Bilan(Base):
    __tablename__ = "BILAN"

    bilan_id = Column(Integer, primary_key=True, autoincrement=True)
    create_date = Column(Date, nullable=False)
    user_id = Column(Integer, ForeignKey("User.user_id"), nullable=False)
    pme_id = Column(Integer, ForeignKey("PME.pme_id"), nullable=False)
    Periode = Column(Integer, nullable=False)  # YEAR type in MySQL
    total_entrees = Column(Integer, nullable=False)
    total_depenses = Column(Integer, nullable=False)

    # Relationships
    user = relationship("User", back_populates="bilans")
    pme = relationship("PME", back_populates="bilans")