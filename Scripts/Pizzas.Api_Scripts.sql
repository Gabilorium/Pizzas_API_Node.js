USE [DAI-Pizzas]
GO
/****** Object:  User [alumno]    Script Date: 20/3/2023 09:53:46 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [Pizzas]    Script Date: 20/3/2023 09:53:47 ******/
CREATE USER [Pizzas] FOR LOGIN [Pizzas] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Pizzas]
GO
/****** Object:  Table [dbo].[Pizzas]    Script Date: 20/3/2023 09:53:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pizzas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](150) NULL,
	[LibreGluten] [bit] NULL,
	[Importe] [float] NULL,
	[Descripcion] [varchar](max) NULL,
 CONSTRAINT [PK_Pizzas] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[CreatePizza]    Script Date: 20/3/2023 09:53:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreatePizza]

@nombre varchar(50),
@libreGluten bit,
@importe int,
@descripcion varchar(MAX)
AS
BEGIN
	INSERT INTO Pizzas (Nombre , LibreGluten , Importe , Descripcion) 
	VALUES (@nombre , @libreGluten , @importe , @descripcion)
END
GO
/****** Object:  StoredProcedure [dbo].[DeletePizza]    Script Date: 20/3/2023 09:53:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[DeletePizza]

@id int

AS
BEGIN
	DELETE FROM Pizzas WHERE Id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[GetAll]    Script Date: 20/3/2023 09:53:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAll]

AS
BEGIN

SELECT * FROM Pizzas

END
GO
/****** Object:  StoredProcedure [dbo].[GetByID]    Script Date: 20/3/2023 09:53:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetByID]

@Id int
AS
BEGIN

SELECT * FROM Pizzas where Pizzas.Id = @Id 

END
GO
/****** Object:  StoredProcedure [dbo].[UpdatePizza]    Script Date: 20/3/2023 09:53:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdatePizza]

@id int,
@nombre varchar(50),
@libreGluten bit,
@importe int,
@descripcion varchar(MAX)

AS
BEGIN
	UPDATE Pizzas SET Nombre = @nombre, LibreGluten = @libreGluten , Importe = @importe , Descripcion = @descripcion 
	where Id=@Id
END
GO
